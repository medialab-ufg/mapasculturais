# FVA
Plugin para museus adicionarem o Formulário de Visitação Anual
Ao instalar o plugin, terá disponível a aba **FVA**
na página do espaço do museu.

## Ativação

Para ativar este plugin, adicione a pasta 'Fva' em 'src/protected/application/plugins'.
Feito isto, configure seu config.php:

```PHP

'plugins' => [
    //... other plugin you may have...
    'Fva' =>['namespace'=>'Fva'],
],

```
