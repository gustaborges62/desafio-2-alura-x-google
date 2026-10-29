"""
=============================================================================
CALCULATOR CORE (MÓDULO MATEMÁTICO PURO)
=============================================================================
Lógica de cálculo das 4 operações matemáticas básicas em Python puro:
- Adição (+)
- Subtração (-)
- Multiplicação (*)
- Divisão (/) com interceptação e tratamento de divisão por zero.
=============================================================================
"""

import math
from decimal import Decimal, getcontext

# Configura precisão decimal suficiente para evitar erros de ponto flutuante
getcontext().prec = 12


class DivisaoPorZeroError(Exception):
    """Exceção levantada ao tentar realizar divisão por zero."""
    pass


class CalculatorCore:
    """Motor com as 4 operações matemáticas básicas e validação de precisão."""

    @staticmethod
    def somar(a: float, b: float) -> float:
        """Retorna a soma de a e b com precisão decimal exata."""
        resultado = float(Decimal(str(a)) + Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(resultado)

    @staticmethod
    def subtrair(a: float, b: float) -> float:
        """Retorna a subtração de a menos b."""
        resultado = float(Decimal(str(a)) - Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(resultado)

    @staticmethod
    def multiplicar(a: float, b: float) -> float:
        """Retorna a multiplicação de a por b."""
        resultado = float(Decimal(str(a)) * Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(resultado)

    @staticmethod
    def dividir(a: float, b: float) -> float:
        """
        Retorna a divisão de a por b.
        Lança DivisaoPorZeroError caso o divisor seja igual a zero.
        """
        if b == 0 or Decimal(str(b)) == Decimal("0"):
            raise DivisaoPorZeroError("Erro: Não é possível dividir por zero!")
        resultado = float(Decimal(str(a)) / Decimal(str(b)))
        return CalculatorCore._sanitizar_zero(resultado)

    @staticmethod
    def porcentagem(valor: float, base: float = None) -> float:
        """
        Calcula a porcentagem com alta precisão decimal:
        - Se apenas 'valor' for informado, calcula a fração direta: valor / 100 (ex: 50% -> 0.5).
        - Se 'base' for informada, calcula a fatia percentual da base: (base * valor) / 100 (ex: 15% de 200 -> 30.0).
        """
        dec_valor = Decimal(str(valor))
        if base is None:
            resultado = float(dec_valor / Decimal("100"))
        else:
            dec_base = Decimal(str(base))
            resultado = float((dec_base * dec_valor) / Decimal("100"))
        return CalculatorCore._sanitizar_zero(resultado)

    @staticmethod
    def calcular_operacao(a: float, operador: str, b: float) -> float:
        """
        Executa a operação matemática correspondente ao símbolo informado (+, -, *, /, %).
        """
        if operador == "+":
            return CalculatorCore.somar(a, b)
        elif operador == "-":
            return CalculatorCore.subtrair(a, b)
        elif operador in ("*", "×"):
            return CalculatorCore.multiplicar(a, b)
        elif operador in ("/", "÷"):
            return CalculatorCore.dividir(a, b)
        elif operador == "%":
            return CalculatorCore.porcentagem(b, a)
        else:
            raise ValueError(f"Operador aritmético desconhecido: '{operador}'")

    @staticmethod
    def formatar_numero(valor: float) -> str:
        """
        Formata o número para exibição limpa no visor:
        - Inteiros não mostram decimais supérfluos (ex: 5.0 -> '5')
        - Decimais são limitados a até 6 casas sem zeros extras (ex: 3.140000 -> '3.14')
        """
        if math.isnan(valor) or math.isinf(valor):
            return "Erro"

        if valor.is_integer():
            return str(int(valor))

        formatado = f"{valor:.6f}".rstrip('0').rstrip('.')
        return formatado

    @staticmethod
    def _sanitizar_zero(valor: float) -> float:
        """Evita o zero negativo (-0.0) comum em floats."""
        if valor == 0.0 or valor == -0.0:
            return 0.0
        return valor
