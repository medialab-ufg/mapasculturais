# mapasculturais-tainacan
Plugin para museus adicionarem o Formulário de Visitação Mensal
Ao cadastrar o espaço, terá disponível o campo **Link para repositório Tainacan:**
na aba "Sobre".

## Ativação

Para ativar este plugin, adicione a pasta 'Fvm' em 'src/protected/application/plugins'.
Feito isto, configure seu config.php:

```PHP

'plugins' => [
    //... other plugin you may have...
    'Tainacan' =>['namespace'=>'Tainacan'],
],

```
