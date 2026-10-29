# ✨ AeroCalc 2000 · Calculadora Frutiger Aero em Python

Uma aplicação desktop desenvolvida exclusivamente em **Python puro**, unindo a estética nostálgica **Frutiger Aero** dos anos 2000 à arquitetura de software profissional: desacoplamento de responsabilidades, cobertura de **testes de precisão automatizados (`unittest`)** e script para compilação em **executável (`.exe`) independente** para Windows.

---

## 🎨 Design Frutiger Aero dos Anos 2000

- **Botões Glossy Gel:** Renderizados no `tk.Canvas` com geometria convexa, chanfros e calota elíptica superior de reflexo especular de luz.
- **Glassmorphism:** Moldura em degradê azul-marinho translúcido com bordas biseladas.
- **Visor LCD Rebaixado:** Display com alto contraste, fundo esmeralda profundo e caracteres em ciano luminescente.
- **Controle por Teclado:** Digitação natural com as teclas físicas `0-9`, `+`, `-`, `*`, `/`, `%`, `Enter`, `Backspace` e `Esc`.
- **Operações Matemáticas:** Adição, Subtração, Multiplicação, Divisão e Porcentagem (direta e contextual).

---

## 📂 Arquitetura dos Arquivos

```text
meu_projeto/
├── calculator_core.py   # Lógica matemática pura e regras de precisão decimal
├── test_calculator.py   # Suite de testes unitários automatizados (unittest)
├── main.py              # Interface gráfica Frutiger Aero em Tkinter puro
├── build_exe.bat        # Script automatizado para compilar em .EXE
└── README.md            # Documentação completa do projeto
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Python 3.8 ou superior** instalado.
- Como o projeto usa apenas módulos padrão (`tkinter`, `unittest`, `decimal`, `math`), **não é necessário instalar nenhuma biblioteca adicional via pip**.

### Executar a Calculadora
```bash
# No Windows
python main.py

# No macOS ou Linux
python3 main.py
```

---

## 🧪 Como Rodar os Testes de Precisão (Unit Tests)

O projeto inclui 19 testes automatizados que cobrem as 4 operações básicas, cálculo de porcentagem (%) e casos críticos (como divisão por zero e precisão de números de ponto flutuante):

```bash
# Executar todos os testes com relatório verboso
python -m unittest test_calculator.py -v
```

Exemplo de saída esperada:
```text
test_adicao_com_negativos (test_calculator.TestCalculadoraPrecisao) ... ok
test_adicao_numeros_inteiros (test_calculator.TestCalculadoraPrecisao) ... ok
test_adicao_precisao_decimal_flutuante (test_calculator.TestCalculadoraPrecisao) ... ok
test_despacho_calcular_operacao (test_calculator.TestCalculadoraPrecisao) ... ok
test_divisao_critica_por_zero (test_calculator.TestCalculadoraPrecisao) ... ok
test_divisao_dizima_periodica (test_calculator.TestCalculadoraPrecisao) ... ok
test_divisao_exata (test_calculator.TestCalculadoraPrecisao) ... ok
test_formatacao_numero_limpeza_de_zeros (test_calculator.TestCalculadoraPrecisao) ... ok
test_multiplicacao_com_decimais (test_calculator.TestCalculadoraPrecisao) ... ok
test_multiplicacao_por_zero (test_calculator.TestCalculadoraPrecisao) ... ok
test_multiplicacao_regra_de_sinais (test_calculator.TestCalculadoraPrecisao) ... ok
test_operador_invalido_lanca_excecao (test_calculator.TestCalculadoraPrecisao) ... ok
test_porcentagem_com_decimais (test_calculator.TestCalculadoraPrecisao) ... ok
test_porcentagem_de_um_valor (test_calculator.TestCalculadoraPrecisao) ... ok
test_porcentagem_direta (test_calculator.TestCalculadoraPrecisao) ... ok
test_porcentagem_zero (test_calculator.TestCalculadoraPrecisao) ... ok
test_subtracao_anulacao (test_calculator.TestCalculadoraPrecisao) ... ok
test_subtracao_com_negativos (test_calculator.TestCalculadoraPrecisao) ... ok
test_subtracao_padrao (test_calculator.TestCalculadoraPrecisao) ... ok

----------------------------------------------------------------------
Ran 19 tests in 0.003s

OK
```

---

## 📦 Como Gerar o Executável (.EXE) para Windows

Para distribuir a calculadora como um aplicativo autônomo que roda com dois cliques em qualquer computador Windows (sem necessidade de ter Python instalado):

### Método Rápido (1 Clique)
Execute o arquivo `build_exe.bat`. Ele instala o PyInstaller, valida os testes e cria o arquivo `.exe`.

### Método Manual
```bash
# 1. Instalar o PyInstaller
pip install pyinstaller

# 2. Compilar em arquivo único sem tela preta de terminal
pyinstaller --onefile --noconsole --name "AeroCalc2000" main.py
```

O executável final estará pronto em:
```text
dist/AeroCalc2000.exe
```

---

## 📄 Licença
Distribuído sob a licença **MIT**.
