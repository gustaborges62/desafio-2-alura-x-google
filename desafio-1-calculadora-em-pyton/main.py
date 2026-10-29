"""
=============================================================================
AEROCALC 2000 · INTERFACE GRÁFICA FRUTIGER AERO (PYTHON PURO COM TKINTER)
=============================================================================
Aplicação de Calculadora Gráfica para Desktop desenvolvida estritamente
em Python puro utilizando a biblioteca gráfica nativa 'tkinter'.

Inspirada no design Frutiger Aero dos anos 2000:
- Estilização com transparência e glassmorphism
- Botões bolha 'Glossy Gel' com reflexo especular superior
- Visor LCD com fundo escuro e glow em ciano
- Mapeamento completo para teclado físico
- Foco nas operações matemáticas essenciais (+, -, *, /, %)
=============================================================================
Como executar:
    python main.py        (no Windows)
    python3 main.py       (no macOS / Linux)
=============================================================================
"""

import tkinter as tk
from calculator_core import CalculatorCore, DivisaoPorZeroError


class FrutigerAeroButton(tk.Canvas):
    """
    Componente de botão construído sobre tk.Canvas para renderizar a estética
    glossy gel dos anos 2000 com reflexos de luz, relevo e bordas chanfradas.
    """

    def __init__(self, parent, text, command=None, width=72, height=58,
                 bg_color="#0284c7", top_gloss="#7dd3fc", text_color="#ffffff",
                 font=("Segoe UI", 16, "bold")):
        super().__init__(parent, width=width, height=height,
                         bg="#082f49", highlightthickness=0, cursor="hand2")
        self.text = text
        self.command = command
        self.w = width
        self.h = height
        self.bg_color = bg_color
        self.top_gloss = top_gloss
        self.text_color = text_color
        self.font = font
        self.is_pressed = False

        self.bind("<Enter>", lambda e: self.draw_button(hover=True))
        self.bind("<Leave>", lambda e: self.draw_button(hover=False))
        self.bind("<Button-1>", self.on_press)
        self.bind("<ButtonRelease-1>", self.on_release)

        self.draw_button()

    def draw_button(self, hover=False):
        """Desenha as camadas vetoriais: borda chanfrada, corpo e calota de brilho."""
        self.delete("all")
        r = 13
        w, h = self.w, self.h
        offset = 1 if self.is_pressed else 0

        base_color = self.bg_color
        if hover and not self.is_pressed:
            base_color = self._clarear_cor(self.bg_color, 1.15)

        # 1. Borda externa suave translúcida (Sombra & Bevel)
        self._rounded_rect(1, 1 + offset, w - 1, h - 1 + offset, r,
                           fill="#0c4a6e", outline="#38bdf8", width=1)

        # 2. Corpo do botão com volume
        self._rounded_rect(3, 3 + offset, w - 3, h - 3 + offset, r - 2,
                           fill=base_color, outline="#bae6fd", width=1)

        # 3. Reflexo Especular Glossy Gel (Calota elíptica superior)
        if not self.is_pressed:
            self._rounded_rect(5, 5, w - 5, int(h * 0.46), r - 4,
                               fill=self.top_gloss, outline="")
            self.create_oval(8, 4, w - 8, int(h * 0.35),
                             fill="#ffffff", outline="", stipple="gray50")

        # 4. Texto com leve sombra para profundidade
        self.create_text(w // 2 + 1, (h // 2) + 1 + offset, text=self.text,
                         font=self.font, fill="#042f2e")
        self.create_text(w // 2, (h // 2) + offset, text=self.text,
                         font=self.font, fill=self.text_color)

    def _rounded_rect(self, x1, y1, x2, y2, r, **kwargs):
        points = [
            x1 + r, y1, x2 - r, y1,
            x2, y1, x2, y1 + r,
            x2, y2 - r, x2, y2,
            x2 - r, y2, x1 + r, y2,
            x1, y2, x1, y2 - r,
            x1, y1 + r, x1, y1
        ]
        return self.create_polygon(points, smooth=True, **kwargs)

    def on_press(self, event):
        self.is_pressed = True
        self.draw_button(hover=True)

    def on_release(self, event):
        self.is_pressed = False
        self.draw_button(hover=False)
        if self.command:
            self.command()

    @staticmethod
    def _clarear_cor(hex_str, fator):
        hex_clean = hex_str.lstrip('#')
        rgb = tuple(int(hex_clean[i:i + 2], 16) for i in (0, 2, 4))
        rgb_nova = [min(255, int(c * fator)) for c in rgb]
        return f"#{rgb_nova[0]:02x}{rgb_nova[1]:02x}{rgb_nova[2]:02x}"


class FrutigerAeroCalculator(tk.Tk):
    """
    Janela Principal da Calculadora Frutiger Aero.
    Integra o motor matemático puro CalculatorCore aos widgets de interface.
    """

    def __init__(self):
        super().__init__()
        self.title("AeroCalc 2000")
        self.geometry("380x560")
        self.resizable(False, False)
        self.configure(bg="#082f49")

        self.core = CalculatorCore()

        # Variáveis da Máquina de Estados
        self.current_operand = "0"
        self.stored_operand = None
        self.pending_operator = None
        self.should_reset_operand = False

        self.setup_ui()
        self.bind_keyboard()

    def setup_ui(self):
        # 1. Moldura Principal Glassmorphism
        glass_frame = tk.Frame(self, bg="#075985", bd=2, relief="ridge")
        glass_frame.pack(fill="both", expand=True, padx=14, pady=14)

        # 2. Barra de Título Superior Frutiger Aero
        bar = tk.Frame(glass_frame, bg="#0c4a6e")
        bar.pack(fill="x", padx=4, pady=4)
        tk.Label(
            bar, text="✨ AeroCalc 2000 · Frutiger Aero",
            font=("Segoe UI", 10, "bold"), fg="#7dd3fc", bg="#0c4a6e"
        ).pack(side="left", padx=8, pady=3)

        # 3. Visor LCD Rebaixado com Glow Ciano
        lcd = tk.Frame(glass_frame, bg="#042f2e", bd=3, relief="sunken")
        lcd.pack(fill="x", padx=12, pady=10)

        self.history_label = tk.Label(
            lcd, text="", font=("Segoe UI", 10), fg="#5eead4", bg="#042f2e", anchor="e"
        )
        self.history_label.pack(fill="x", padx=10, pady=(6, 0))

        self.display_label = tk.Label(
            lcd, text="0", font=("Consolas", 28, "bold"), fg="#38bdf8", bg="#042f2e", anchor="e"
        )
        self.display_label.pack(fill="x", padx=10, pady=(0, 8))

        # 4. Grade de Botões Glossy
        grid = tk.Frame(glass_frame, bg="#075985")
        grid.pack(fill="both", expand=True, padx=10, pady=8)

        buttons = [
            ("C", self.action_clear, "#0284c7", "#38bdf8", 0, 0),
            ("±", self.action_toggle_sign, "#0284c7", "#38bdf8", 0, 1),
            ("⌫", self.action_backspace, "#0284c7", "#38bdf8", 0, 2),
            ("÷", lambda: self.action_operator("/"), "#059669", "#34d399", 0, 3),

            ("7", lambda: self.action_digit("7"), "#0369a1", "#7dd3fc", 1, 0),
            ("8", lambda: self.action_digit("8"), "#0369a1", "#7dd3fc", 1, 1),
            ("9", lambda: self.action_digit("9"), "#0369a1", "#7dd3fc", 1, 2),
            ("×", lambda: self.action_operator("*"), "#059669", "#34d399", 1, 3),

            ("4", lambda: self.action_digit("4"), "#0369a1", "#7dd3fc", 2, 0),
            ("5", lambda: self.action_digit("5"), "#0369a1", "#7dd3fc", 2, 1),
            ("6", lambda: self.action_digit("6"), "#0369a1", "#7dd3fc", 2, 2),
            ("-", lambda: self.action_operator("-"), "#059669", "#34d399", 2, 3),

            ("1", lambda: self.action_digit("1"), "#0369a1", "#7dd3fc", 3, 0),
            ("2", lambda: self.action_digit("2"), "#0369a1", "#7dd3fc", 3, 1),
            ("3", lambda: self.action_digit("3"), "#0369a1", "#7dd3fc", 3, 2),
            ("+", lambda: self.action_operator("+"), "#059669", "#34d399", 3, 3),

            ("0", lambda: self.action_digit("0"), "#0369a1", "#7dd3fc", 4, 0),
            (".", self.action_decimal, "#0369a1", "#7dd3fc", 4, 1),
            ("%", self.action_percentage, "#0284c7", "#38bdf8", 4, 2),
            ("=", self.action_equals, "#10b981", "#6ee7b7", 4, 3),
        ]

        for c in range(4):
            grid.columnconfigure(c, weight=1, uniform="btn_c")
        for r in range(5):
            grid.rowconfigure(r, weight=1, uniform="btn_r")

        for item in buttons:
            text, cmd, bg_c, top_g, r, c = item[:6]
            colspan = item[6] if len(item) > 6 else 1
            w = 150 if colspan == 2 else 72

            btn = FrutigerAeroButton(
                grid, text=text, command=cmd, width=w, height=56,
                bg_color=bg_c, top_gloss=top_g,
                text_color="#f0fdf4" if "10b981" in bg_c else "#ffffff"
            )
            btn.grid(row=r, column=c, columnspan=colspan, padx=4, pady=4, sticky="nsew")

    def bind_keyboard(self):
        """Conecta as teclas físicas do teclado para operação natural."""
        for d in "0123456789":
            self.bind(d, lambda e, val=d: self.action_digit(val))
        self.bind("+", lambda e: self.action_operator("+"))
        self.bind("-", lambda e: self.action_operator("-"))
        self.bind("*", lambda e: self.action_operator("*"))
        self.bind("/", lambda e: self.action_operator("/"))
        self.bind(".", lambda e: self.action_decimal())
        self.bind("%", lambda e: self.action_percentage())
        self.bind("<Return>", lambda e: self.action_equals())
        self.bind("<KP_Enter>", lambda e: self.action_equals())
        self.bind("<BackSpace>", lambda e: self.action_backspace())
        self.bind("<Escape>", lambda e: self.action_clear())

    # =========================================================================
    # LÓGICA DE PROGRAMAÇÃO DAS 4 OPERAÇÕES BÁSICAS
    # =========================================================================

    def action_digit(self, char):
        """Concatena dígitos no número atual."""
        if self.should_reset_operand or self.current_operand == "0" or self.current_operand.startswith("Erro"):
            self.current_operand = char
            self.should_reset_operand = False
        else:
            if len(self.current_operand) < 12:
                self.current_operand += char
        self.display_label.config(text=self.current_operand)

    def action_decimal(self):
        """Insere separador decimal evitando duplicação."""
        if self.should_reset_operand or self.current_operand.startswith("Erro"):
            self.current_operand = "0."
            self.should_reset_operand = False
        elif "." not in self.current_operand:
            self.current_operand += "."
        self.display_label.config(text=self.current_operand)

    def action_operator(self, op):
        """Recebe o operador aritmético (+, -, *, /) e gerencia transição de estado."""
        try:
            val = float(self.current_operand)
        except ValueError:
            return

        if self.stored_operand is not None and not self.should_reset_operand:
            self.calculate()

        self.stored_operand = float(self.current_operand)
        self.pending_operator = op
        self.should_reset_operand = True

        simbolos = {"+": "+", "-": "−", "*": "×", "/": "÷"}
        self.history_label.config(
            text=f"{self.core.formatar_numero(self.stored_operand)} {simbolos.get(op, op)}"
        )

    def action_equals(self):
        """Executa a operação matemática pendente."""
        if self.pending_operator is not None and self.stored_operand is not None:
            self.calculate()
            self.history_label.config(text="")
            self.stored_operand = None
            self.pending_operator = None
            self.should_reset_operand = True

    def calculate(self):
        """Executa a operação no CalculatorCore com proteção contra divisão por zero."""
        try:
            res = self.core.calcular_operacao(
                self.stored_operand,
                self.pending_operator,
                float(self.current_operand)
            )
            self.current_operand = self.core.formatar_numero(res)
        except DivisaoPorZeroError:
            self.current_operand = "Erro: Div por 0"
            self.should_reset_operand = True
        except Exception:
            self.current_operand = "Erro"
            self.should_reset_operand = True
        self.display_label.config(text=self.current_operand)

    def action_backspace(self):
        """Remove o último dígito."""
        if self.should_reset_operand or len(self.current_operand) <= 1 or self.current_operand.startswith("Erro"):
            self.current_operand = "0"
        else:
            self.current_operand = self.current_operand[:-1]
        self.display_label.config(text=self.current_operand)

    def action_clear(self):
        """Reinicia todo o estado da calculadora."""
        self.current_operand = "0"
        self.stored_operand = None
        self.pending_operator = None
        self.should_reset_operand = False
        self.history_label.config(text="")
        self.display_label.config(text="0")

    def action_toggle_sign(self):
        """Inverte o sinal (+ / -)."""
        if self.current_operand != "0" and not self.current_operand.startswith("Erro"):
            if self.current_operand.startswith("-"):
                self.current_operand = self.current_operand[1:]
            else:
                self.current_operand = "-" + self.current_operand
            self.display_label.config(text=self.current_operand)

    def action_percentage(self):
        """
        Calcula a porcentagem (%) com suporte contextual ou direto:
        - Contextual (ex: 200 + 10%): calcula a fatia percentual da base (10% de 200 = 20)
          para que o usuário veja o acréscimo/desconto e finalize com '='.
        - Direto (ex: 50%): converte diretamente para fração decimal (0.5).
        """
        try:
            val_atual = float(self.current_operand)
        except ValueError:
            return

        if self.stored_operand is not None and self.pending_operator is not None:
            # Fatia percentual do valor base armazenado
            fatia = self.core.porcentagem(val_atual, base=self.stored_operand)
            self.current_operand = self.core.formatar_numero(fatia)
        else:
            # Fração decimal direta
            direto = self.core.porcentagem(val_atual)
            self.current_operand = self.core.formatar_numero(direto)
            self.should_reset_operand = True

        self.display_label.config(text=self.current_operand)


if __name__ == "__main__":
    app = FrutigerAeroCalculator()
    app.mainloop()
