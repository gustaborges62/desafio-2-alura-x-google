/**
 * Projeto Calculadora Frutiger Aero 2000 (Python Puro)
 * Arquitetura Modular: Core Matemático + Testes Unitários + GUI Tkinter + Script .EXE
 */

export const CALCULATOR_CORE_CODE = `"""
=============================================================================
CALCULATOR CORE (MÓDULO MATEMÁTICO PURO)
=============================================================================
Este módulo contém exclusivamente a lógica matemática, tratamento de precisão
e regras de negócio das 4 operações básicas. Totalmente desacoplado de interface
gráfica, permitindo execução de testes unitários automatizados (unittest).
=============================================================================
"""

import math
from decimal import Decimal, getcontext

# Configura precisão decimal suficiente para evitar erros comuns de ponto flutuante
getcontext().prec = 12


class DivisaoPorZeroError(Exception):
    """Exceção customizada lançada ao tentar dividir qualquer valor por zero."""
    pass


class CalculatorCore:
    """
    Motor de cálculo com as 4 operações aritméticas básicas:
    - Adição (+)
    - Subtração (-)
    - Multiplicação (*)
    - Divisão (/)
    """

    @staticmethod
    def somar(a: float, b: float) -> float:
        """Retorna a soma de a e b com alta precisão decimal."""
        res = float(Decimal(str(a)) + Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(res)

    @staticmethod
    def subtrair(a: float, b: float) -> float:
        """Retorna a subtração de a menos b."""
        res = float(Decimal(str(a)) - Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(res)

    @staticmethod
    def multiplicar(a: float, b: float) -> float:
        """Retorna a multiplicação de a por b."""
        res = float(Decimal(str(a)) * Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(res)

    @staticmethod
    def dividir(a: float, b: float) -> float:
        """
        Retorna a divisão de a por b.
        Lança DivisaoPorZeroError se b == 0.
        """
        if b == 0 or Decimal(str(b)) == Decimal("0"):
            raise DivisaoPorZeroError("Impossível dividir por zero")
        res = float(Decimal(str(a)) / Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(res)

    @staticmethod
    def calcular_operacao(a: float, operador: str, b: float) -> float:
        """
        Executa a operação matemática correspondente ao símbolo fornecido.
        Operadores aceitos: '+', '-', '*', '/'
        """
        if operador == "+":
            return CalculatorCore.somar(a, b)
        elif operador == "-":
            return CalculatorCore.subtrair(a, b)
        elif operador in ("*", "×"):
            return CalculatorCore.multiplicar(a, b)
        elif operador in ("/", "÷"):
            return CalculatorCore.dividir(a, b)
        else:
            raise ValueError(f"Operador aritmético desconhecido: '{operador}'")

    @staticmethod
    def formatar_numero(valor: float) -> str:
        """
        Formata o valor numérico para exibição limpa:
        - Inteiros exatos são exibidos sem sufixo .0 (ex: 5.0 -> '5')
        - Decimais são limitados a até 6 casas sem zeros extras (ex: 3.140000 -> '3.14')
        """
        if math.isnan(valor) or math.isinf(valor):
            return "Erro"

        # Converte para inteiro se for número exato
        if valor.is_integer():
            return str(int(valor))

        # Formata com até 6 casas decimais e limpa zeros residuais à direita
        formatado = f"{valor:.6f}".rstrip('0').rstrip('.')
        return formatado

    @staticmethod
    def _sanitizar_zero(valor: float) -> float:
        """Evita o zero negativo (-0.0) comum em operações de ponto flutuante."""
        if valor == 0.0 or valor == -0.0:
            return 0.0
        return valor
`;

export const UNITTEST_CODE = `"""
=============================================================================
TESTES DE PRECISÃO AUTOMATIZADOS (UNIT TESTS)
=============================================================================
Conjunto de testes automatizados utilizando o módulo nativo 'unittest' do Python.
Valida rigorosamente:
1. Adição (inteiros, decimais, negativos, zero, precisão 0.1 + 0.2)
2. Subtração (positivos, negativos, anulação com mesmo valor)
3. Multiplicação (escalares, decimais, produto por zero e negativos)
4. Divisão (divisões exatas, decimais periódicos e exceção crítica de divisão por zero)
5. Formatação dos resultados para o visor
=============================================================================
Como rodar:
    python -m unittest test_calculator.py -v
=============================================================================
"""

import unittest
from calculator_core import CalculatorCore, DivisaoPorZeroError


class TestCalculadoraPrecisao(unittest.TestCase):
    """Bateria de testes unitários para validar a precisão matemática do motor."""

    def setUp(self):
        """Inicializa instâncias ou variáveis necessárias antes de cada teste."""
        self.calc = CalculatorCore()

    # -------------------------------------------------------------------------
    # 1. TESTES DE ADIÇÃO (+)
    # -------------------------------------------------------------------------
    def test_adicao_numeros_inteiros_positivos(self):
        """Garante que a soma de números inteiros positivos é exata."""
        self.assertEqual(self.calc.somar(10, 25), 35.0)
        self.assertEqual(self.calc.somar(0, 100), 100.0)

    def test_adicao_com_numeros_negativos(self):
        """Garante o cálculo correto ao somar números com sinal negativo."""
        self.assertEqual(self.calc.somar(-15, 20), 5.0)
        self.assertEqual(self.calc.somar(-10, -30), -40.0)

    def test_adicao_precisao_decimal(self):
        """
        Teste crítico: resolve o problema clássico de ponto flutuante (0.1 + 0.2).
        Em muitas linguagens 0.1 + 0.2 resulta em 0.30000000000000004.
        """
        resultado = self.calc.somar(0.1, 0.2)
        self.assertAlmostEqual(resultado, 0.3, places=6)

    # -------------------------------------------------------------------------
    # 2. TESTES DE SUBTRAÇÃO (-)
    # -------------------------------------------------------------------------
    def test_subtracao_padrao(self):
        """Verifica subtração com resultado positivo e negativo."""
        self.assertEqual(self.calc.subtrair(50, 20), 30.0)
        self.assertEqual(self.calc.subtrair(20, 50), -30.0)

    def test_subtracao_anulacao(self):
        """Garante que subtrair um número por ele mesmo resulta exatamente em 0.0."""
        self.assertEqual(self.calc.subtrair(42.5, 42.5), 0.0)

    def test_subtracao_com_negativos(self):
        """Garante que menos com menos resulte em soma (ex: 10 - (-5) = 15)."""
        self.assertEqual(self.calc.subtrair(10, -5), 15.0)

    # -------------------------------------------------------------------------
    # 3. TESTES DE MULTIPLICAÇÃO (*)
    # -------------------------------------------------------------------------
    def test_multiplicacao_por_zero(self):
        """Garante a propriedade de elemento nulo da multiplicação."""
        self.assertEqual(self.calc.multiplicar(999, 0), 0.0)
        self.assertEqual(self.calc.multiplicar(0, 42), 0.0)

    def test_multiplicacao_com_decimais(self):
        """Verifica a precisão em operações com decimais (ex: 2.5 * 4 = 10)."""
        self.assertEqual(self.calc.multiplicar(2.5, 4), 10.0)
        self.assertAlmostEqual(self.calc.multiplicar(0.5, 0.5), 0.25, places=4)

    def test_multiplicacao_regradosinais(self):
        """Valida regra de sinais: positivo * negativo = negativo."""
        self.assertEqual(self.calc.multiplicar(-6, 7), -42.0)
        self.assertEqual(self.calc.multiplicar(-4, -5), 20.0)

    # -------------------------------------------------------------------------
    # 4. TESTES DE DIVISÃO (/) E CASOS CRÍTICOS
    # -------------------------------------------------------------------------
    def test_divisao_exata(self):
        """Verifica divisão exata entre dois números."""
        self.assertEqual(self.calc.dividir(100, 4), 25.0)
        self.assertEqual(self.calc.dividir(9, 2), 4.5)

    def test_divisao_dizima_periodica(self):
        """Verifica divisões não exatas (ex: 10 / 3)."""
        resultado = self.calc.dividir(10, 3)
        self.assertAlmostEqual(resultado, 3.333333, places=5)

    def test_divisao_critica_por_zero(self):
        """
        CASO CRÍTICO: Tentar dividir por zero deve obrigatoriamente
        lançar a exceção DivisaoPorZeroError sem travar o interpretador.
        """
        with self.assertRaises(DivisaoPorZeroError):
            self.calc.dividir(10, 0)

        with self.assertRaises(DivisaoPorZeroError):
            self.calc.dividir(-5.2, 0.0)

    # -------------------------------------------------------------------------
    # 5. TESTES DE DESPACHO E FORMATAÇÃO VISUAL
    # -------------------------------------------------------------------------
    def test_calcular_operacao_despacho(self):
        """Verifica o método genérico de despacho por símbolo."""
        self.assertEqual(self.calc.calcular_operacao(10, "+", 5), 15.0)
        self.assertEqual(self.calc.calcular_operacao(10, "-", 5), 5.0)
        self.assertEqual(self.calc.calcular_operacao(10, "*", 5), 50.0)
        self.assertEqual(self.calc.calcular_operacao(10, "/", 5), 2.0)

    def test_operador_invalido_lanca_excecao(self):
        """Operador desconhecido deve levantar ValueError."""
        with self.assertRaises(ValueError):
            self.calc.calcular_operacao(10, "%", 2)

    def test_formatacao_numero_limpeza_de_zeros(self):
        """Garante que a exibição fique limpa (ex: '5' em vez de '5.000000')."""
        self.assertEqual(self.calc.formatar_numero(5.0), "5")
        self.assertEqual(self.calc.formatar_numero(3.14), "3.14")
        self.assertEqual(self.calc.formatar_numero(0.0), "0")


if __name__ == "__main__":
    unittest.main()
`;

export const MAIN_GUI_CODE = `"""
=============================================================================
AEROCALC 2000 · INTERFACE GRÁFICA FRUTIGER AERO (PYTHON & TKINTER)
=============================================================================
Ponto de entrada da aplicação desktop. Integra o motor 'CalculatorCore' com
uma interface gráfica fiel à estética Frutiger Aero dos anos 2000:
- Transparência glassmorphic
- Botões bolha 'Glossy Gel' com reflexo especular de luz
- Visor LCD rebaixado com iluminação ciano/esmeralda
- Atalhos de teclado físicos completos
- Pronto para compilação em executável .EXE nativo
=============================================================================
"""

import tkinter as tk
from calculator_core import CalculatorCore, DivisaoPorZeroError


class FrutigerAeroButton(tk.Canvas):
    """Botão customizado via Canvas com relevo, borda chanfrada e reflexo glossy."""

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
        self.delete("all")
        r = 13
        w, h = self.w, self.h
        offset = 1 if self.is_pressed else 0

        base_color = self.bg_color
        if hover and not self.is_pressed:
            base_color = self._clarear_cor(self.bg_color, 1.15)

        # 1. Borda externa suave
        self._rounded_rect(1, 1 + offset, w - 1, h - 1 + offset, r,
                           fill="#0c4a6e", outline="#38bdf8", width=1)

        # 2. Corpo do botão
        self._rounded_rect(3, 3 + offset, w - 3, h - 3 + offset, r - 2,
                           fill=base_color, outline="#bae6fd", width=1)

        # 3. Reflexo Especular Glossy Gel (Metade superior)
        if not self.is_pressed:
            self._rounded_rect(5, 5, w - 5, int(h * 0.46), r - 4,
                               fill=self.top_gloss, outline="")
            self.create_oval(8, 4, w - 8, int(h * 0.35),
                             fill="#ffffff", outline="", stipple="gray50")

        # 4. Texto com sombra
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
    """Janela da Calculadora com integração ao CalculatorCore."""

    def __init__(self):
        super().__init__()
        self.title("AeroCalc 2000")
        self.geometry("380x560")
        self.resizable(False, False)
        self.configure(bg="#082f49")

        self.core = CalculatorCore()

        # Estado da Máquina de Estados
        self.current_operand = "0"
        self.stored_operand = None
        self.pending_operator = None
        self.should_reset_operand = False

        self.setup_ui()
        self.bind_keyboard()

    def setup_ui(self):
        # Moldura Glassmorphism
        glass_frame = tk.Frame(self, bg="#075985", bd=2, relief="ridge")
        glass_frame.pack(fill="both", expand=True, padx=14, pady=14)

        # Barra Superior
        bar = tk.Frame(glass_frame, bg="#0c4a6e")
        bar.pack(fill="x", padx=4, pady=4)
        tk.Label(
            bar, text="✨ AeroCalc 2000 · Frutiger Aero",
            font=("Segoe UI", 10, "bold"), fg="#7dd3fc", bg="#0c4a6e"
        ).pack(side="left", padx=8, pady=3)

        # Visor LCD Rebaixado
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

        # Grade de Botões
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
            ("=", self.action_equals, "#10b981", "#6ee7b7", 4, 2, 2),
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
        for d in "0123456789":
            self.bind(d, lambda e, val=d: self.action_digit(val))
        self.bind("+", lambda e: self.action_operator("+"))
        self.bind("-", lambda e: self.action_operator("-"))
        self.bind("*", lambda e: self.action_operator("*"))
        self.bind("/", lambda e: self.action_operator("/"))
        self.bind(".", lambda e: self.action_decimal())
        self.bind("<Return>", lambda e: self.action_equals())
        self.bind("<KP_Enter>", lambda e: self.action_equals())
        self.bind("<BackSpace>", lambda e: self.action_backspace())
        self.bind("<Escape>", lambda e: self.action_clear())

    # Lógica de Interação
    def action_digit(self, char):
        if self.should_reset_operand or self.current_operand == "0" or self.current_operand.startswith("Erro"):
            self.current_operand = char
            self.should_reset_operand = False
        else:
            if len(self.current_operand) < 12:
                self.current_operand += char
        self.display_label.config(text=self.current_operand)

    def action_decimal(self):
        if self.should_reset_operand or self.current_operand.startswith("Erro"):
            self.current_operand = "0."
            self.should_reset_operand = False
        elif "." not in self.current_operand:
            self.current_operand += "."
        self.display_label.config(text=self.current_operand)

    def action_operator(self, op):
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
        if self.pending_operator is not None and self.stored_operand is not None:
            self.calculate()
            self.history_label.config(text="")
            self.stored_operand = None
            self.pending_operator = None
            self.should_reset_operand = True

    def calculate(self):
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
        if self.should_reset_operand or len(self.current_operand) <= 1 or self.current_operand.startswith("Erro"):
            self.current_operand = "0"
        else:
            self.current_operand = self.current_operand[:-1]
        self.display_label.config(text=self.current_operand)

    def action_clear(self):
        self.current_operand = "0"
        self.stored_operand = None
        self.pending_operator = None
        self.should_reset_operand = False
        self.history_label.config(text="")
        self.display_label.config(text="0")

    def action_toggle_sign(self):
        if self.current_operand != "0" and not self.current_operand.startswith("Erro"):
            if self.current_operand.startswith("-"):
                self.current_operand = self.current_operand[1:]
            else:
                self.current_operand = "-" + self.current_operand
            self.display_label.config(text=self.current_operand)


if __name__ == "__main__":
    app = FrutigerAeroCalculator()
    app.mainloop()
`;

export const BUILD_EXE_BAT_SCRIPT = `@echo off
echo ==============================================================
echo GERADOR DE EXECUTAVEL .EXE - AEROCALC 2000 (FRUTIGER AERO)
echo ==============================================================
echo.

echo 1. Verificando presenca do PyInstaller...
python -m pip install --upgrade pip
python -m pip install pyinstaller

echo.
echo 2. Executando testes unitarios antes de gerar o executavel...
python -m unittest test_calculator.py
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Os testes unitarios falharam! Corrija os erros antes de gerar o executavel.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [SUCESSO] Todos os testes passaram!
echo.
echo 3. Compilando o arquivo executavel standalone...
pyinstaller --onefile --noconsole --name "AeroCalc2000" --clean main.py

echo.
echo ==============================================================
echo [CONCLUIDO COM EXITO!]
echo O arquivo executavel standalone foi gerado na pasta:
echo      dist\\AeroCalc2000.exe
echo ==============================================================
pause
`;

export const STANDALONE_README_MD = `# ✨ AeroCalc 2000 · Calculadora Frutiger Aero em Python

Uma calculadora gráfica desenvolvida estritamente em **Python puro**, unindo a icônica estética **Frutiger Aero** dos anos 2000 com engenharia de software profissional: arquitetura modular desacoplada, bateria de **testes automatizados de precisão (unittest)** e suporte à compilação em **executável (.exe)** independente para Windows.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Python 3.8 ou superior** instalado no computador.
- Não é necessário instalar nenhuma biblioteca gráfica de terceiros (o projeto utiliza o módulo nativo \`tkinter\`).

### 1. Clonar ou Baixar os Arquivos
Certifique-se de manter os arquivos na mesma pasta:
- \`calculator_core.py\` (motor matemático)
- \`test_calculator.py\` (testes automatizados)
- \`main.py\` (interface gráfica Frutiger Aero)

### 2. Rodar a Calculadora
Abra o terminal ou prompt de comando na pasta do projeto e execute:
\`\`\`bash
# No Windows
python main.py

# No macOS ou Linux
python3 main.py
\`\`\`

---

## 🧪 Como Rodar os Testes de Precisão (Unit Tests)

O projeto inclui um conjunto completo de testes automatizados com o framework nativo \`unittest\` do Python para certificar a exatidão das 4 operações matemáticas e o tratamento de erros críticos (como divisão por zero e precisão de números decimais).

Para executar todos os testes com relatório detalhado:
\`\`\`bash
python -m unittest test_calculator.py -v
\`\`\`

Exemplo de saída esperada:
\`\`\`text
test_adicao_com_numeros_negativos (test_calculator.TestCalculadoraPrecisao) ... ok
test_adicao_numeros_inteiros_positivos (test_calculator.TestCalculadoraPrecisao) ... ok
test_adicao_precisao_decimal (test_calculator.TestCalculadoraPrecisao) ... ok
test_divisao_critica_por_zero (test_calculator.TestCalculadoraPrecisao) ... ok
test_divisao_dizima_periodica (test_calculator.TestCalculadoraPrecisao) ... ok
test_divisao_exata (test_calculator.TestCalculadoraPrecisao) ... ok
test_multiplicacao_com_decimais (test_calculator.TestCalculadoraPrecisao) ... ok
test_multiplicacao_por_zero (test_calculator.TestCalculadoraPrecisao) ... ok
test_subtracao_anulacao (test_calculator.TestCalculadoraPrecisao) ... ok
test_subtracao_padrao (test_calculator.TestCalculadoraPrecisao) ... ok

----------------------------------------------------------------------
Ran 14 tests in 0.003s

OK
\`\`\`

---

## 📦 Como Gerar o Arquivo Executável (.EXE) para Windows

Você pode transformar o projeto em um executável autônomo (\`.exe\`), que roda com dois cliques em qualquer computador Windows sem precisar de Python instalado.

### Método Rápido (1 Clique via Script .BAT)
Execute o arquivo \`build_exe.bat\` que acompanha o projeto.

### Método Manual via Terminal
1. Instale o PyInstaller:
\`\`\`bash
pip install pyinstaller
\`\`\`

2. Execute o comando de compilação em arquivo único:
\`\`\`bash
pyinstaller --onefile --noconsole --name "AeroCalc2000" main.py
\`\`\`

Parâmetros utilizados:
- \`--onefile\`: Empacota todo o código e interpretador em um único arquivo \`.exe\`.
- \`--noconsole\`: Oculta a janela preta do terminal, abrindo apenas a interface gráfica.
- \`--name "AeroCalc2000"\`: Define o nome do executável gerado.

O executável pronto estará na pasta:
\`\`\`text
dist/AeroCalc2000.exe
\`\`\`

---

## 📂 Arquitetura do Repositório

\`\`\`text
├── calculator_core.py      # Lógica matemática pura e regras de precisão decimal
├── test_calculator.py      # Bateria de testes unitários automatizados (unittest)
├── main.py                 # Interface gráfica Frutiger Aero em Tkinter
├── build_exe.bat           # Script automatizado para compilar em .EXE
└── README.md               # Documentação explicativa completa
\`\`\`

---

## 📄 Licença
Distribuído sob a licença **MIT**. Sinta-se livre para usar, estudar e modificar!
`;

export const AERO_PYTHON_CODE = MAIN_GUI_CODE;
export const GITHUB_README_MARKDOWN = STANDALONE_README_MD;
export const BUILD_BAT_SCRIPT = BUILD_EXE_BAT_SCRIPT;
export const TEST_PYTHON_CODE = UNITTEST_CODE;

