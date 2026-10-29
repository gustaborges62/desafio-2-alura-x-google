"""
=============================================================================
TESTES DE PRECISÃO AUTOMATIZADOS (UNIT TESTS) - PYTHON UNITTEST
=============================================================================
Suite de testes automatizados utilizando exclusivamente o framework nativo
'unittest' do Python. Não requer instalação de pacotes externos.

Para executar todos os testes:
    python3 -m unittest test_calculator.py -v
=============================================================================
"""

import unittest
from calculator_core import CalculatorCore, DivisaoPorZeroError


class TestCalculadoraPrecisao(unittest.TestCase):
    """Conjunto de testes unitários para certificar a precisão matemática."""

    def setUp(self):
        """Instancia o motor de cálculo antes de cada teste."""
        self.calc = CalculatorCore()

    # -------------------------------------------------------------------------
    # 1. TESTES DE ADIÇÃO (+)
    # -------------------------------------------------------------------------
    def test_adicao_numeros_inteiros(self):
        """Soma simples de números inteiros positivos (15 + 25 = 40)."""
        self.assertEqual(self.calc.somar(15, 25), 40.0)
        self.assertEqual(self.calc.somar(0, 100), 100.0)

    def test_adicao_com_negativos(self):
        """Soma envolvendo números com sinal negativo (-15 + 20 = 5)."""
        self.assertEqual(self.calc.somar(-15, 20), 5.0)
        self.assertEqual(self.calc.somar(-10, -30), -40.0)

    def test_adicao_precisao_decimal_flutuante(self):
        """
        Caso crítico de precisão: 0.1 + 0.2 em ponto flutuante binário.
        Deve resultar exatamente em 0.3 sem resíduos de aproximação.
        """
        resultado = self.calc.somar(0.1, 0.2)
        self.assertAlmostEqual(resultado, 0.3, places=6)

    # -------------------------------------------------------------------------
    # 2. TESTES DE SUBTRAÇÃO (-)
    # -------------------------------------------------------------------------
    def test_subtracao_padrao(self):
        """Subtração com resultado positivo e negativo (50 - 20 = 30)."""
        self.assertEqual(self.calc.subtrair(50, 20), 30.0)
        self.assertEqual(self.calc.subtrair(20, 50), -30.0)

    def test_subtracao_anulacao(self):
        """Subtrair um número por ele mesmo deve resultar rigorosamente em 0.0."""
        self.assertEqual(self.calc.subtrair(42.5, 42.5), 0.0)

    def test_subtracao_com_negativos(self):
        """Subtração com número negativo vira adição: 10 - (-5) = 15."""
        self.assertEqual(self.calc.subtrair(10, -5), 15.0)

    # -------------------------------------------------------------------------
    # 3. TESTES DE MULTIPLICAÇÃO (*)
    # -------------------------------------------------------------------------
    def test_multiplicacao_por_zero(self):
        """Garante a propriedade de elemento nulo (qualquer número * 0 = 0.0)."""
        self.assertEqual(self.calc.multiplicar(999, 0), 0.0)
        self.assertEqual(self.calc.multiplicar(0, 42), 0.0)

    def test_multiplicacao_com_decimais(self):
        """Produto entre números com ponto flutuante (2.5 * 4 = 10 e 0.5 * 0.5 = 0.25)."""
        self.assertEqual(self.calc.multiplicar(2.5, 4), 10.0)
        self.assertAlmostEqual(self.calc.multiplicar(0.5, 0.5), 0.25, places=4)

    def test_multiplicacao_regra_de_sinais(self):
        """Validação da regra de sinais: -6 * 7 = -42 e -4 * -5 = 20."""
        self.assertEqual(self.calc.multiplicar(-6, 7), -42.0)
        self.assertEqual(self.calc.multiplicar(-4, -5), 20.0)

    # -------------------------------------------------------------------------
    # 4. TESTES DE DIVISÃO (/) E CASOS CRÍTICOS
    # -------------------------------------------------------------------------
    def test_divisao_exata(self):
        """Divisão com resultado inteiro exato (100 / 4 = 25)."""
        self.assertEqual(self.calc.dividir(100, 4), 25.0)
        self.assertEqual(self.calc.dividir(9, 2), 4.5)

    def test_divisao_dizima_periodica(self):
        """Divisão que resulta em dízima periódica (10 / 3 ≈ 3.333333)."""
        resultado = self.calc.dividir(10, 3)
        self.assertAlmostEqual(resultado, 3.333333, places=5)

    def test_divisao_critica_por_zero(self):
        """
        CASO CRÍTICO: Divisão por 0 DEVE obrigatoriamente levantar
        a exceção DivisaoPorZeroError sem interromper a execução do programa.
        """
        with self.assertRaises(DivisaoPorZeroError):
            self.calc.dividir(10, 0)

        with self.assertRaises(DivisaoPorZeroError):
            self.calc.dividir(-5.2, 0.0)

    # -------------------------------------------------------------------------
    # 5. TESTES DE PORCENTAGEM (%)
    # -------------------------------------------------------------------------
    def test_porcentagem_direta(self):
        """Valida a conversão percentual direta (ex: 50% = 0.5, 100% = 1.0)."""
        self.assertEqual(self.calc.porcentagem(50), 0.5)
        self.assertEqual(self.calc.porcentagem(100), 1.0)
        self.assertAlmostEqual(self.calc.porcentagem(12.5), 0.125, places=4)

    def test_porcentagem_de_um_valor(self):
        """Valida percentual aplicado sobre um valor base (ex: 15% de 200 = 30)."""
        self.assertEqual(self.calc.porcentagem(15, base=200), 30.0)
        self.assertEqual(self.calc.porcentagem(10, base=1000), 100.0)
        self.assertEqual(self.calc.porcentagem(50, base=80), 40.0)

    def test_porcentagem_com_decimais(self):
        """Valida cálculo de porcentagem envolvendo valores com ponto flutuante."""
        self.assertEqual(self.calc.porcentagem(2.5, base=500), 12.5)

    def test_porcentagem_zero(self):
        """Garante que 0% de qualquer número seja estritamente 0.0."""
        self.assertEqual(self.calc.porcentagem(0), 0.0)
        self.assertEqual(self.calc.porcentagem(0, base=500), 0.0)

    # -------------------------------------------------------------------------
    # 6. TESTES DE ESTRUTURA E FORMATAÇÃO VISUAL
    # -------------------------------------------------------------------------
    def test_despacho_calcular_operacao(self):
        """Valida despacho correto para +, -, *, /, %."""
        self.assertEqual(self.calc.calcular_operacao(10, "+", 5), 15.0)
        self.assertEqual(self.calc.calcular_operacao(10, "-", 5), 5.0)
        self.assertEqual(self.calc.calcular_operacao(10, "*", 5), 50.0)
        self.assertEqual(self.calc.calcular_operacao(10, "/", 5), 2.0)
        self.assertEqual(self.calc.calcular_operacao(200, "%", 15), 30.0)

    def test_operador_invalido_lanca_excecao(self):
        """Operador aritmético não suportado deve lançar ValueError."""
        with self.assertRaises(ValueError):
            self.calc.calcular_operacao(10, "^", 2)
        with self.assertRaises(ValueError):
            self.calc.calcular_operacao(10, "@", 2)

    def test_formatacao_numero_limpeza_de_zeros(self):
        """Garante exibição limpa no display LCD (ex: 5.0 -> '5')."""
        self.assertEqual(self.calc.formatar_numero(5.0), "5")
        self.assertEqual(self.calc.formatar_numero(3.14), "3.14")
        self.assertEqual(self.calc.formatar_numero(0.0), "0")


if __name__ == "__main__":
    unittest.main()
