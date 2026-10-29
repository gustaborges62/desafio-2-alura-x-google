@echo off
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
echo [SUCESSO] Todos os testes passaram com exito!
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
