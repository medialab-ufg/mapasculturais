<style>

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
    margin-bottom: 10px;
}

.item-title{
    background: #e8eff2;
}

.pergunta-fva{
    text-align: left;
}

.resposta-fva{
    text-align: center;
}

.nav-panel{
    margin-top: 20px;
}

.display-warning{
    color: red;
    font-weight: bold;
}

.pergunta-questionario{
    font-weight: bold;
    margin-top: 15px;
}
</style>

<div id="fva-survey">
    <form id="fva-form">
        <div ui-view></div>
    </form>
</div>