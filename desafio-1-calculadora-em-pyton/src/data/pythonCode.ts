export interface CodeVersion {
  id: string;
  name: string;
  badge: string;
  description: string;
  code: string;
}

export const BASIC_PYTHON_CODE = `# ==============================================================
# CALCULADORA SIMPLES EM PYTHON
# Operações básicas: Adição, Subtração, Multiplicação e Divisão
# ==============================================================

# 1. DEFINIÇÃO DAS FUNÇÕES
# Cada função é responsável por uma única operação matemática.
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro número pelo segundo."""
    return a - b

def multiplicar(a, b):
    """Retorna a multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão do primeiro número pelo segundo.
    Verifica previamente se o divisor é zero para evitar erro no programa.
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def porcentagem(valor, base=None):
    """
    Calcula porcentagem:
    - Se base for None: fração direta (ex: 50% = 0.5)
    - Se base informada: percentual da base (ex: 15% de 200 = 30)
    """
    if base is None:
        return valor / 100
    return (base * valor) / 100


# 2. PROGRAMA PRINCIPAL
def calculadora():
    print("================================")
    print("      CALCULADORA EM PYTHON     ")
    print("================================")
    print("Selecione a operação desejada:")
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Porcentagem (%)")
    print("--------------------------------")

    # Coleta a opção escolhida pelo usuário
    opcao = input("Digite o número da operação (1/2/3/4/5): ").strip()

    # Valida se a opção é válida antes de pedir os números
    if opcao in ['1', '2', '3', '4', '5']:
        # Coleta os dois números e converte de texto para número decimal (float)
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\\nErro: Por favor, digite apenas números válidos!")
            return

        print("\\n--------------------------------")
        print("RESULTADO:")

        # Estrutura condicional para decidir qual função executar
        if opcao == '1':
            resultado = somar(num1, num2)
            print(f"{num1} + {num2} = {resultado}")

        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"{num1} - {num2} = {resultado}")

        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"{num1} * {num2} = {resultado}")

        elif opcao == '4':
            resultado = dividir(num1, num2)
            if isinstance(resultado, str):
                # Se o resultado for uma mensagem de texto (erro de divisão por zero)
                print(resultado)
            else:
                print(f"{num1} / {num2} = {resultado}")

        elif opcao == '5':
            resultado = porcentagem(num2, base=num1)
            print(f"{num2}% de {num1} = {resultado}")

        print("--------------------------------")
    else:
        print("\\nOpção inválida! Escolha um número entre 1 e 5.")


# 3. PONTO DE ENTRADA DO SCRIPT
# Garante que a calculadora só execute quando o arquivo for rodado diretamente
if __name__ == "__main__":
    calculadora()
`;

export const LOOP_PYTHON_CODE = `# ==============================================================
# CALCULADORA EM PYTHON (COM LOOP CONTÍNUO)
# Permite realizar múltiplos cálculos sem reiniciar o programa
# ==============================================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return None  # Indica divisão inválida
    return a / b

def porcentagem(valor, base=None):
    if base is None:
        return valor / 100
    return (base * valor) / 100

def calculadora():
    while True:
        print("\\n" + "="*32)
        print("     CALCULADORA INTERATIVA     ")
        print("="*32)
        print("1 - Adição (+)")
        print("2 - Subtração (-)")
        print("3 - Multiplicação (*)")
        print("4 - Divisão (/)")
        print("5 - Porcentagem (%)")
        print("0 - Sair do programa")
        print("-" * 32)

        opcao = input("Escolha uma opção (0 a 5): ").strip()

        if opcao == '0':
            print("\\nObrigado por usar a calculadora! Bons estudos em Python.")
            break

        if opcao not in ['1', '2', '3', '4', '5']:
            print("\\nOpção inválida! Tente novamente.")
            continue

        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\\nValor inválido! Digite apenas números.")
            continue

        print("-" * 32)
        if opcao == '1':
            print(f"Resultado: {num1} + {num2} = {somar(num1, num2)}")
        elif opcao == '2':
            print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
        elif opcao == '3':
            print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
        elif opcao == '4':
            res = dividir(num1, num2)
            if res is None:
                print("Erro: Impossível dividir por zero!")
            else:
                print(f"Resultado: {num1} / {num2} = {res}")
        elif opcao == '5':
            print(f"Resultado: {num2}% de {num1} = {porcentagem(num2, base=num1)}")

if __name__ == "__main__":
    calculadora()
`;

export interface ConceptItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  analogy: string;
  description: string;
  snippet: string;
  details: string[];
  tips: string;
}

export const CONCEPTS: ConceptItem[] = [
  {
    id: "funcoes",
    title: "1. Funções (def)",
    subtitle: "Organização e reaproveitamento de código",
    badge: "Conceito Chave",
    iconName: "Boxes",
    analogy: "Pense em uma função como uma receita na gaveta: você escreve o passo a passo uma vez e usa quantas vezes quiser sem precisar reescrever tudo.",
    description: "Em Python, definimos funções com a palavra-chave `def`. Cada função recebe parâmetros (entradas) e devolve um resultado através do comando `return`.",
    snippet: `def somar(a, b):
    return a + b`,
    details: [
      "Modularidade: Cada cálculo (soma, subtração, etc.) tem seu próprio bloco isolado.",
      "Facilidade de teste: Se houver um erro na divisão, você vai direto na função dividir sem mexer no restante.",
      "Legibilidade: O código principal fica limpo e intuitivo de ler."
    ],
    tips: "Dica de ouro: Dê sempre nomes claros e descritivos para suas funções no infinitivo (ex: somar, calcular_media, validar_cpf)."
  },
  {
    id: "condicionais",
    title: "2. Estruturas Condicionais (if, elif, else)",
    subtitle: "A tomada de decisões do programa",
    badge: "Lógica",
    iconName: "GitFork",
    analogy: "É como uma placa de trânsito em uma bifurcação: 'Se for para a esquerda, vá para X; se for para a direita, vá para Y; senão, siga em frente'.",
    description: "Permite ao programa avaliar qual operação matemática o usuário escolheu no menu ('1', '2', '3' ou '4') e executar somente o bloco correspondente.",
    snippet: `if opcao == '1':
    resultado = somar(num1, num2)
elif opcao == '2':
    resultado = subtrair(num1, num2)
else:
    print("Opção inválida!")`,
    details: [
      "if: Primeira condição a ser testada.",
      "elif (abreviação de 'else if'): Testada apenas se as anteriores forem falsas.",
      "else: O caminho padrão caso nenhuma das condições seja satisfeita (ex: o usuário digitou '9').",
      "Indentação: Em Python, o espaçamento de 4 espaços define quem está dentro do bloco condicional."
    ],
    tips: "Em Python não usamos chaves { } para blocos! O alinhamento dos 4 espaços é o que define o que pertence a cada condição."
  },
  {
    id: "entradas",
    title: "3. Entrada e Conversão de Tipos (input & float)",
    subtitle: "Recebendo e tratando dados do usuário",
    badge: "Entrada e Saída",
    iconName: "Binary",
    analogy: "A função input() sempre ouve como um texto escrito. Se você passar '10' e '5', para ela são duas palavras. O float() converte essas palavras em números reais para a matemática funcionar.",
    description: "Por padrão, tudo o que o usuário digita na função input() chega como String (texto). Se você fizer '5' + '5', o resultado seria '55'! Para somar de verdade, usamos float().",
    snippet: `texto = input("Digite um número: ")
numero = float(texto)  # Transforma '12.5' em 12.5`,
    details: [
      "input(): Pausa o programa e aguarda o usuário digitar algo no teclado e teclar Enter.",
      "float(): Converte para ponto flutuante (números decimais), permitindo contas com 3.14, 0.5, etc.",
      "try / except: Protege contra erros caso o usuário digite letras (ex: 'dez') onde o programa esperava dígitos numéricos."
    ],
    tips: "Use float() em vez de int() quando estiver criando calculadoras, pois o usuário pode querer calcular 10.5 dividido por 2!"
  },
  {
    id: "divisao-zero",
    title: "4. Tratamento da Divisão por Zero",
    subtitle: "Evitando que o programa quebre (ZeroDivisionError)",
    badge: "Boas Práticas",
    iconName: "ShieldAlert",
    analogy: "Se você tem 10 maçãs e zero pessoas para dividir, a pergunta não faz sentido matemático. No computador, isso causa um travamento instantâneo se não prevenirmos.",
    description: "Na matemática real e na ciência da computação, dividir qualquer número por 0 é indefinido e gera a exceção ZeroDivisionError no Python.",
    snippet: `def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b`,
    details: [
      "Prevenção preventiva: Checamos 'if b == 0:' antes de realizar o operador '/'.",
      "Mensagem amigável: Em vez de mostrar uma mensagem assustadora em inglês, mostramos um aviso claro e educado ao usuário.",
      "Robustez: O programa continua funcionando normalmente sem fechar abruptamente."
    ],
    tips: "Sempre valide os dados que podem quebrar operações lógicas antes de executá-las."
  },
  {
    id: "fstrings",
    title: "5. Formatação com f-strings",
    subtitle: "Exibição elegante de textos com variáveis",
    badge: "Python Moderno",
    iconName: "Sparkles",
    analogy: "É como uma folha com lacunas para preencher com o nome de alguém em um certificado pronto.",
    description: "As f-strings (format strings) são a forma mais legível e moderna de embutir variáveis dentro de mensagens no Python.",
    snippet: `print(f"{num1} + {num2} = {resultado}")`,
    details: [
      "Basta colocar um 'f' minúsculo logo antes das aspas da string.",
      "Tudo o que estiver dentro de chaves { } será substituído pelo valor da variável ou expressão matemática.",
      "Muito mais limpo do que usar concatenações com '+' ou '%' antigo."
    ],
    tips: "Você também pode formatar casas decimais facilmente, por exemplo: f'{resultado:.2f}' para fixar 2 casas decimais!"
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que a função input() retorna por padrão em Python?",
    options: [
      "Sempre um número inteiro (int)",
      "Sempre uma cadeia de caracteres / texto (str)",
      "Um número decimal (float)",
      "O tipo do dado digitado automaticamente"
    ],
    correctIndex: 1,
    explanation: "O input() sempre entrega os dados como texto (string). Por isso precisamos usar int() ou float() para realizar operações matemáticas."
  },
  {
    id: 2,
    question: "Por que devemos verificar se o segundo número é zero antes de dividir?",
    options: [
      "Porque o Python não aceita números menores que 1",
      "Porque a divisão por zero gera um erro fatal (ZeroDivisionError) que encerra o programa",
      "Porque o resultado seria sempre infinito positivo",
      "É apenas uma preferência visual sem impacto no programa"
    ],
    correctIndex: 1,
    explanation: "Na computação, dividir por 0 aciona a exceção ZeroDivisionError, que derruba a execução se não houver um tratamento adequado."
  },
  {
    id: 3,
    question: "Qual comando é usado para criar uma função personalizada em Python?",
    options: [
      "function somar(a, b):",
      "def somar(a, b):",
      "create somar(a, b):",
      "func somar(a, b):"
    ],
    correctIndex: 1,
    explanation: "Em Python, utilizamos a palavra reservada 'def' (de 'define') seguida pelo nome da função e parênteses com os parâmetros."
  },
  {
    id: 4,
    question: "Como o Python sabe quais comandos pertencem a um bloco 'if' ou 'def'?",
    options: [
      "Pela abertura e fechamento de chaves { }",
      "Pela indentação (espaçamento no início da linha, geralmente 4 espaços)",
      "Pela palavra 'end' no final do bloco",
      "Pelos pontos e vírgulas no final de cada instrução"
    ],
    correctIndex: 1,
    explanation: "O Python usa a indentação obrigatória para estruturar blocos de código. Isso garante um código sempre limpo e organizado visualmente."
  }
];
