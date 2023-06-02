// Função para fazer a requisição HTTP
function getCotacaoDolar(valor, callback) {
    // URL da API do Google para consultar a cotação do dólar
    const url = 'https://www.google.com/search?q=dolar+hoje';
  
    // Fazendo a requisição HTTP
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Extrai a cotação do dólar do conteúdo da página
        const regex = /<span class="DFlfde SwHCTb" data-precision="2">(.*?)<\/span>/;
        const matches = data.match(regex);
        const cotacao = matches ? parseFloat(matches[1].replace(',', '.')) : null;
  
        // Verifica se a cotação foi obtida com sucesso
        if (cotacao !== null) {
          const valorConvertido = valor / cotacao;
          callback(null, valorConvertido);
        } else {
          callback('Não foi possível obter a cotação do dólar.');
        }
      })
      .catch(error => {
        callback('Ocorreu um erro na requisição: ' + error);
      });
  }
  
  // Solicita o valor monetário ao usuário
  const valorMonetario = parseFloat(prompt('Digite o valor monetário:'));
  
  // Verifica se o valor digitado é válido
  if (!isNaN(valorMonetario)) {
    // Consulta a cotação do dólar e retorna o valor convertido
    getCotacaoDolar(valorMonetario, (error, valorConvertido) => {
      if (error) {
        console.log('Erro:', error);
      } else {
        console.log('Valor convertido:', valorConvertido.toFixed(2));
      }
    });
  } else {
    console.log('Valor inválido.');
  }
  