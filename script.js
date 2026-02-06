/* ================================
   E-COMMERCE - JAVASCRIPT
   ================================ */

// Dados dos produtos
let produtos = [];
let carrinho = [];
let cupomAplicado = null;

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados
    carregarDados();
    
    // Configurar tema
    configurarTema();
    
    // Configurar eventos comuns
    configurarEventos();
    
    // Verificar página atual
    if (document.querySelector('.grid-produtos')) {
        inicializarPaginaInicial();
    }
    
    if (document.querySelector('.pagina-produto')) {
        inicializarPaginaProduto();
    }
    
    if (document.querySelector('.pagina-carrinho')) {
        inicializarPaginaCarrinho();
    }
});

/* ================================
   GERENCIAMENTO DE DADOS
   ================================ */

// Carregar dados do localStorage
function carregarDados() {
    // Carregar produtos
    const produtosSalvos = localStorage.getItem('produtosEcommerce');
    if (!produtosSalvos) {
        // Dados iniciais
        produtos = [
            {
                id: 1,
                nome: 'Smartphone Galaxy S23',
                descricao: 'Smartphone Samsung com tela de 6.1", 128GB, 8GB RAM',
                descricaoDetalhada: 'O Galaxy S23 é o smartphone premium da Samsung com processador Snapdragon 8 Gen 2, câmera de 50MP e bateria de 3900mAh. Ideal para quem busca performance e fotos de alta qualidade.',
                categoria: 'smartphone',
                preco: 4299.99,
                precoOriginal: 4899.99,
                desconto: 12,
                imagens: ['https://images.unsplash.com/photo-1611791484670-ce19b801d192?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 15,
                especificacoes: [
                    { chave: 'Tela', valor: '6.1" Dynamic AMOLED' },
                    { chave: 'Processador', valor: 'Snapdragon 8 Gen 2' },
                    { chave: 'Memória', valor: '8GB RAM' },
                    { chave: 'Armazenamento', valor: '128GB' },
                    { chave: 'Câmera Principal', valor: '50MP' },
                    { chave: 'Bateria', valor: '3900mAh' },
                    { chave: 'Sistema', valor: 'Android 13' }
                ],
                vendas: 245
            },
            {
                id: 2,
                nome: 'iPhone 14 Pro',
                descricao: 'Smartphone Apple com tela de 6.1", 256GB, câmera de 48MP',
                descricaoDetalhada: 'O iPhone 14 Pro traz o revolucionário Dynamic Island, câmera de 48MP com fotos em RAW Pro e processador A16 Bionic. A experiência iPhone no seu melhor.',
                categoria: 'smartphone',
                preco: 8499.99,
                precoOriginal: 8999.99,
                desconto: 6,
                imagens: ['https://images.unsplash.com/photo-1663499482523-1c0c1eae63ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 8,
                especificacoes: [
                    { chave: 'Tela', valor: '6.1" Super Retina XDR' },
                    { chave: 'Processador', valor: 'A16 Bionic' },
                    { chave: 'Memória', valor: '6GB RAM' },
                    { chave: 'Armazenamento', valor: '256GB' },
                    { chave: 'Câmera Principal', valor: '48MP' },
                    { chave: 'Bateria', valor: '3200mAh' },
                    { chave: 'Sistema', valor: 'iOS 16' }
                ],
                vendas: 189
            },
            {
                id: 3,
                nome: 'Notebook Dell XPS 13',
                descricao: 'Notebook ultrafino com processador i7, 16GB RAM, 512GB SSD',
                descricaoDetalhada: 'O Dell XPS 13 é um notebook premium com tela InfinityEdge de 13.4", processador Intel Core i7 de 12ª geração e design ultrafino em alumínio.',
                categoria: 'notebook',
                preco: 7999.99,
                precoOriginal: 8999.99,
                desconto: 11,
                imagens: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 12,
                especificacoes: [
                    { chave: 'Tela', valor: '13.4" FHD+' },
                    { chave: 'Processador', valor: 'Intel Core i7-1250U' },
                    { chave: 'Memória', valor: '16GB LPDDR5' },
                    { chave: 'Armazenamento', valor: '512GB SSD' },
                    { chave: 'GPU', valor: 'Intel Iris Xe' },
                    { chave: 'Sistema', valor: 'Windows 11 Pro' },
                    { chave: 'Peso', valor: '1.2kg' }
                ],
                vendas: 92
            },
            {
                id: 4,
                nome: 'Fone Sony WH-1000XM5',
                descricao: 'Fone de ouvido com cancelamento de ruído líder do mercado',
                descricaoDetalhada: 'Os Sony WH-1000XM5 oferecem o melhor cancelamento de ruído do mercado com processador V1 integrado, 30 horas de bateria e som de alta qualidade.',
                categoria: 'audio',
                preco: 2299.99,
                precoOriginal: 2799.99,
                desconto: 18,
                imagens: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 25,
                especificacoes: [
                    { chave: 'Tipo', valor: 'Over-ear' },
                    { chave: 'Cancelamento de Ruído', valor: 'Sim, ativo' },
                    { chave: 'Bateria', valor: '30 horas' },
                    { chave: 'Conectividade', valor: 'Bluetooth 5.2' },
                    { chave: 'Microfone', valor: '8 microfones' },
                    { chave: 'Peso', valor: '250g' }
                ],
                vendas: 156
            },
            {
                id: 5,
                nome: 'Console PlayStation 5',
                descricao: 'Console de última geração com SSD ultrarrápido',
                descricaoDetalhada: 'O PlayStation 5 oferece experiências de jogo revolucionárias com SSD customizado, ray tracing e feedback háptico no controle DualSense.',
                categoria: 'games',
                preco: 4299.99,
                precoOriginal: 4499.99,
                desconto: 4,
                imagens: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 5,
                especificacoes: [
                    { chave: 'Processador', valor: 'AMD Zen 2' },
                    { chave: 'GPU', valor: 'AMD RDNA 2' },
                    { chave: 'Memória', valor: '16GB GDDR6' },
                    { chave: 'Armazenamento', valor: '825GB SSD' },
                    { chave: 'Saída de Vídeo', valor: '4K 120Hz' },
                    { chave: 'Controle', valor: 'DualSense' }
                ],
                vendas: 78
            },
            {
                id: 6,
                nome: 'Smart TV LG OLED 55"',
                descricao: 'TV OLED 4K com processador α9 e Dolby Vision',
                descricaoDetalhada: 'A LG OLED oferece cores perfeitas com pixels autoiluminados, processador α9 Gen6 e suporte a Dolby Vision IQ e Dolby Atmos.',
                categoria: 'tv',
                preco: 5999.99,
                precoOriginal: 6999.99,
                desconto: 14,
                imagens: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 10,
                especificacoes: [
                    { chave: 'Tela', valor: '55" OLED 4K' },
                    { chave: 'Processador', valor: 'α9 Gen6' },
                    { chave: 'HDR', valor: 'Dolby Vision, HDR10' },
                    { chave: 'Som', valor: '40W, Dolby Atmos' },
                    { chave: 'Conexões', valor: '4x HDMI 2.1' },
                    { chave: 'Sistema', valor: 'webOS 22' }
                ],
                vendas: 45
            },
            {
                id: 7,
                nome: 'Apple Watch Series 8',
                descricao: 'Smartwatch com monitor de saúde avançado',
                descricaoDetalhada: 'O Apple Watch Series 8 traz sensores de temperatura, detecção de quedas e batimento cardíaco, além de bateria de 18 horas.',
                categoria: 'smartwatch',
                preco: 4299.99,
                precoOriginal: 4799.99,
                desconto: 10,
                imagens: ['https://images.unsplash.com/photo-1434493650001-5d43a6fea0a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 18,
                especificacoes: [
                    { chave: 'Tela', valor: 'Always-On Retina' },
                    { chave: 'Processador', valor: 'S8 SiP' },
                    { chave: 'Resistência', valor: 'À prova d\'água 50m' },
                    { chave: 'Sensores', valor: 'Temperatura, ECG, Oxigênio' },
                    { chave: 'Bateria', valor: '18 horas' },
                    { chave: 'Sistema', valor: 'watchOS 9' }
                ],
                vendas: 112
            },
            {
                id: 8,
                nome: 'Tablet Samsung Galaxy Tab S8',
                descricao: 'Tablet premium com S Pen incluído',
                descricaoDetalhada: 'O Galaxy Tab S8 é um tablet Android premium com tela de 11", processador Snapdragon 8 Gen 1 e S Pen incluído para produtividade.',
                categoria: 'tablet',
                preco: 4299.99,
                precoOriginal: 4799.99,
                desconto: 10,
                imagens: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                estoque: 14,
                especificacoes: [
                    { chave: 'Tela', valor: '11" LTPS TFT' },
                    { chave: 'Processador', valor: 'Snapdragon 8 Gen 1' },
                    { chave: 'Memória', valor: '8GB RAM' },
                    { chave: 'Armazenamento', valor: '128GB' },
                    { chave: 'S Pen', valor: 'Incluído' },
                    { chave: 'Bateria', valor: '8000mAh' },
                    { chave: 'Sistema', valor: 'Android 12' }
                ],
                vendas: 67
            }
        ];
        salvarProdutos();
    } else {
        produtos = JSON.parse(produtosSalvos);
    }
    
    // Carregar carrinho
    const carrinhoSalvo = localStorage.getItem('carrinhoEcommerce');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
    
    // Atualizar contador do carrinho
    atualizarContadorCarrinho();
}

// Salvar produtos no localStorage
function salvarProdutos() {
    localStorage.setItem('produtosEcommerce', JSON.stringify(produtos));
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinhoEcommerce', JSON.stringify(carrinho));
}

/* ================================
   CONFIGURAÇÃO DA INTERFACE
   ================================ */

// Configurar tema
function configurarTema() {
    const temaSalvo = localStorage.getItem('temaEcommerce') || 'claro';
    document.documentElement.setAttribute('tema', temaSalvo);
    
    const btnAlternarTema = document.getElementById('alternarTema');
    if (btnAlternarTema) {
        btnAlternarTema.addEventListener('click', alternarTema);
    }
}

// Alternar tema
function alternarTema() {
    const temaAtual = document.documentElement.getAttribute('tema') || 'claro';
    const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';
    
    document.documentElement.setAttribute('tema', novoTema);
    localStorage.setItem('temaEcommerce', novoTema);
    
    // Atualizar ícone
    const icone = document.querySelector('#alternarTema i');
    if (icone) {
        icone.className = novoTema === 'claro' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Configurar eventos comuns
function configurarEventos() {
    // Menu mobile
    const btnMenuMobile = document.getElementById('btnMenuMobile');
    if (btnMenuMobile) {
        btnMenuMobile.addEventListener('click', function() {
            const navegacao = document.querySelector('.navegacao');
            if (navegacao) {
                navegacao.classList.toggle('ativo');
            }
        });
    }
    
    // Busca
    const campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarProdutos(this.value);
            }
        });
    }
    
    const btnBusca = document.querySelector('.btn-busca');
    if (btnBusca) {
        btnBusca.addEventListener('click', function() {
            const campo = document.getElementById('campoBusca');
            if (campo) {
                buscarProdutos(campo.value);
            }
        });
    }
}

// Buscar produtos
function buscarProdutos(termo) {
    if (termo.trim() === '') return;
    
    // Redirecionar para página de produtos com parâmetro de busca
    window.location.href = `index.html?busca=${encodeURIComponent(termo)}#produtos`;
}

/* ================================
   PÁGINA INICIAL
   ================================ */

function inicializarPaginaInicial() {
    // Carregar produtos
    carregarProdutosIniciais();
    
    // Configurar filtros
    configurarFiltros();
    
    // Configurar contador promocional
    iniciarContadorPromocao();
    
    // Configurar botão "Carregar Mais"
    const btnCarregarMais = document.getElementById('carregarMais');
    if (btnCarregarMais) {
        btnCarregarMais.addEventListener('click', carregarMaisProdutos);
    }
}

// Carregar produtos iniciais
function carregarProdutosIniciais() {
    const gridProdutos = document.getElementById('gridProdutos');
    if (!gridProdutos) return;
    
    gridProdutos.innerHTML = '';
    
    // Verificar se há busca na URL
    const urlParams = new URLSearchParams(window.location.search);
    const busca = urlParams.get('busca');
    const categoriaFiltro = document.getElementById('filtroCategoria')?.value || '';
    const ordenar = document.getElementById('ordenar')?.value || 'relevancia';
    
    let produtosFiltrados = produtos;
    
    // Aplicar filtro de busca
    if (busca) {
        const termo = busca.toLowerCase();
        produtosFiltrados = produtosFiltrados.filter(p => 
            p.nome.toLowerCase().includes(termo) || 
            p.descricao.toLowerCase().includes(termo)
        );
        
        // Atualizar campo de busca
        const campoBusca = document.getElementById('campoBusca');
        if (campoBusca) {
            campoBusca.value = busca;
        }
    }
    
    // Aplicar filtro de categoria
    if (categoriaFiltro) {
        produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoriaFiltro);
    }
    
    // Aplicar ordenação
    produtosFiltrados.sort((a, b) => {
        switch(ordenar) {
            case 'preco-crescente':
                return a.preco - b.preco;
            case 'preco-decrescente':
                return b.preco - a.preco;
            case 'nome':
                return a.nome.localeCompare(b.nome);
            default: // relevância
                return b.vendas - a.vendas;
        }
    });
    
    // Limitar a 8 produtos iniciais
    const produtosExibir = produtosFiltrados.slice(0, 8);
    
    // Exibir produtos
    produtosExibir.forEach(produto => {
        const produtoElemento = criarElementoProduto(produto);
        gridProdutos.appendChild(produtoElemento);
    });
    
    // Esconder botão "Carregar Mais" se não houver mais produtos
    const btnCarregarMais = document.getElementById('carregarMais');
    if (btnCarregarMais) {
        btnCarregarMais.style.display = produtosFiltrados.length > 8 ? 'block' : 'none';
    }
}

// Configurar filtros
function configurarFiltros() {
    const filtroCategoria = document.getElementById('filtroCategoria');
    const ordenar = document.getElementById('ordenar');
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', carregarProdutosIniciais);
    }
    
    if (ordenar) {
        ordenar.addEventListener('change', carregarProdutosIniciais);
    }
}

// Carregar mais produtos
function carregarMaisProdutos() {
    const gridProdutos = document.getElementById('gridProdutos');
    const produtosAtuais = gridProdutos.children.length;
    
    // Carregar mais 4 produtos
    const produtosAdicionais = produtos.slice(produtosAtuais, produtosAtuais + 4);
    
    produtosAdicionais.forEach(produto => {
        const produtoElemento = criarElementoProduto(produto);
        gridProdutos.appendChild(produtoElemento);
    });
    
    // Esconder botão se não houver mais produtos
    const btnCarregarMais = document.getElementById('carregarMais');
    if (btnCarregarMais) {
        btnCarregarMais.style.display = produtosAtuais + 4 < produtos.length ? 'block' : 'none';
    }
}

// Criar elemento de produto para a lista
function criarElementoProduto(produto) {
    const div = document.createElement('div');
    div.className = 'cartao-produto';
    if (produto.desconto > 0) {
        div.classList.add('desconto');
    }
    
    const precoFormatado = formatarMoeda(produto.preco);
    const precoOriginalFormatado = produto.precoOriginal ? formatarMoeda(produto.precoOriginal) : '';
    
    div.innerHTML = `
        <div class="imagem-produto">
            <img src="${produto.imagens[0]}" alt="${produto.nome}">
        </div>
        <div class="info-produto">
            <div class="categoria-produto">${obterNomeCategoria(produto.categoria)}</div>
            <h3 class="titulo-produto">
                <a href="produto.html?id=${produto.id}">${produto.nome}</a>
            </h3>
            <div class="avaliacao-produto">
                <div class="estrelas">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <span class="nota">4.5</span>
                <span class="quantidade">(${Math.floor(Math.random() * 100) + 50})</span>
            </div>
            <div class="preco-container">
                <div class="preco-atual">${precoFormatado}</div>
                ${produto.precoOriginal ? `<div class="preco-original">${precoOriginalFormatado}</div>` : ''}
                ${produto.desconto > 0 ? `<div class="desconto-produto">${produto.desconto}% OFF</div>` : ''}
            </div>
            <div class="botoes-produto">
                <button class="btn btn-primario btn-produto adicionar-carrinho" data-id="${produto.id}">
                    <i class="fas fa-shopping-cart"></i> Adicionar
                </button>
                <button class="btn btn-secundario btn-produto ver-detalhes" data-id="${produto.id}">
                    <i class="fas fa-eye"></i> Detalhes
                </button>
            </div>
        </div>
    `;
    
    // Configurar eventos
    const btnAdicionar = div.querySelector('.adicionar-carrinho');
    const btnDetalhes = div.querySelector('.ver-detalhes');
    
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            adicionarAoCarrinho(id, 1);
        });
    }
    
    if (btnDetalhes) {
        btnDetalhes.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            window.location.href = `produto.html?id=${id}`;
        });
    }
    
    return div;
}

/* ================================
   PÁGINA DE PRODUTO
   ================================ */

function inicializarPaginaProduto() {
    // Obter ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = parseInt(urlParams.get('id'));
    
    if (!produtoId || isNaN(produtoId)) {
        window.location.href = 'index.html';
        return;
    }
    
    // Carregar produto
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) {
        window.location.href = 'index.html';
        return;
    }
    
    // Exibir informações do produto
    exibirDetalhesProduto(produto);
    
    // Configurar eventos da página
    configurarEventosProduto(produto);
    
    // Carregar produtos relacionados
    carregarProdutosRelacionados(produto);
    
    // Configurar abas
    configurarAbas();
}

// Exibir detalhes do produto
function exibirDetalhesProduto(produto) {
    // Atualizar informações básicas
    document.getElementById('tituloProduto').textContent = produto.nome;
    document.getElementById('nomeProduto').textContent = produto.nome;
    document.getElementById('categoriaProduto').textContent = obterNomeCategoria(produto.categoria);
    document.getElementById('descricaoProduto').textContent = produto.descricao;
    document.getElementById('descricaoDetalhada').textContent = produto.descricaoDetalhada;
    
    // Preços
    const precoAtual = formatarMoeda(produto.preco);
    const precoOriginal = produto.precoOriginal ? formatarMoeda(produto.precoOriginal) : '';
    const desconto = produto.desconto ? `${produto.desconto}% OFF` : '';
    
    document.getElementById('precoAtual').textContent = precoAtual;
    if (produto.precoOriginal) {
        document.getElementById('precoOriginal').textContent = precoOriginal;
        document.getElementById('desconto').textContent = desconto;
    } else {
        document.getElementById('precoOriginal').style.display = 'none';
        document.getElementById('desconto').style.display = 'none';
    }
    
    // Estoque
    const estoqueElemento = document.getElementById('estoqueDisponivel');
    if (produto.estoque > 10) {
        estoqueElemento.textContent = 'Em estoque';
        estoqueElemento.style.color = 'var(--cor-sucesso)';
    } else if (produto.estoque > 0) {
        estoqueElemento.textContent = `Últimas ${produto.estoque} unidades`;
        estoqueElemento.style.color = 'var(--cor-aviso)';
    } else {
        estoqueElemento.textContent = 'Esgotado';
        estoqueElemento.style.color = 'var(--cor-perigo)';
    }
    
    // Imagens
    const imagemPrincipal = document.getElementById('imagemPrincipal');
    const miniaturas = document.getElementById('miniaturas');
    
    if (produto.imagens && produto.imagens.length > 0) {
        imagemPrincipal.src = produto.imagens[0];
        imagemPrincipal.alt = produto.nome;
        
        // Limpar miniaturas
        miniaturas.innerHTML = '';
        
        // Adicionar miniaturas
        produto.imagens.forEach((imagem, index) => {
            const miniatura = document.createElement('div');
            miniatura.className = 'miniatura' + (index === 0 ? ' ativa' : '');
            miniatura.innerHTML = `<img src="${imagem}" alt="${produto.nome}">`;
            
            miniatura.addEventListener('click', function() {
                // Atualizar imagem principal
                imagemPrincipal.src = imagem;
                
                // Ativar miniatura clicada
                document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('ativa'));
                this.classList.add('ativa');
            });
            
            miniaturas.appendChild(miniatura);
        });
    }
    
    // Especificações
    const especificacoesLista = document.getElementById('especificacoesLista');
    const tabelaEspecificacoes = document.getElementById('tabelaEspecificacoes');
    
    if (produto.especificacoes) {
        // Limpar listas
        especificacoesLista.innerHTML = '';
        tabelaEspecificacoes.innerHTML = '';
        
        // Adicionar especificações
        produto.especificacoes.forEach(espec => {
            // Lista simples
            const li = document.createElement('li');
            li.textContent = `${espec.chave}: ${espec.valor}`;
            especificacoesLista.appendChild(li);
            
            // Tabela detalhada
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${espec.chave}</td>
                <td>${espec.valor}</td>
            `;
            tabelaEspecificacoes.appendChild(tr);
        });
    }
}

// Configurar eventos da página de produto
function configurarEventosProduto(produto) {
    // Quantidade
    const diminuirBtn = document.getElementById('diminuirQuantidade');
    const aumentarBtn = document.getElementById('aumentarQuantidade');
    const quantidadeInput = document.getElementById('quantidade');
    
    if (diminuirBtn) {
        diminuirBtn.addEventListener('click', function() {
            let valor = parseInt(quantidadeInput.value);
            if (valor > 1) {
                quantidadeInput.value = valor - 1;
            }
        });
    }
    
    if (aumentarBtn) {
        aumentarBtn.addEventListener('click', function() {
            let valor = parseInt(quantidadeInput.value);
            const max = Math.min(produto.estoque, 10);
            if (valor < max) {
                quantidadeInput.value = valor + 1;
            }
        });
    }
    
    // Adicionar ao carrinho
    const btnAdicionarCarrinho = document.getElementById('adicionarCarrinho');
    if (btnAdicionarCarrinho) {
        btnAdicionarCarrinho.addEventListener('click', function() {
            const quantidade = parseInt(quantidadeInput.value);
            adicionarAoCarrinho(produto.id, quantidade);
        });
    }
    
    // Comprar agora
    const btnComprarAgora = document.getElementById('comprarAgora');
    if (btnComprarAgora) {
        btnComprarAgora.addEventListener('click', function() {
            const quantidade = parseInt(quantidadeInput.value);
            adicionarAoCarrinho(produto.id, quantidade, true);
        });
    }
}

// Carregar produtos relacionados
function carregarProdutosRelacionados(produto) {
    const gridRelacionados = document.getElementById('produtosRelacionados');
    if (!gridRelacionados) return;
    
    // Encontrar produtos da mesma categoria (exceto o atual)
    const relacionados = produtos
        .filter(p => p.categoria === produto.categoria && p.id !== produto.id)
        .slice(0, 4);
    
    // Limpar grid
    gridRelacionados.innerHTML = '';
    
    // Adicionar produtos relacionados
    relacionados.forEach(prod => {
        const produtoElemento = criarElementoProduto(prod);
        gridRelacionados.appendChild(produtoElemento);
    });
}

// Configurar abas
function configurarAbas() {
    const abaLinks = document.querySelectorAll('.aba-link');
    const conteudosAbas = document.querySelectorAll('.aba-conteudo');
    
    abaLinks.forEach(link => {
        link.addEventListener('click', function() {
            const aba = this.getAttribute('data-aba');
            
            // Remover classe ativa de todos
            abaLinks.forEach(l => l.classList.remove('ativo'));
            conteudosAbas.forEach(c => c.classList.remove('ativo'));
            
            // Adicionar classe ativa à aba clicada
            this.classList.add('ativo');
            
            // Mostrar conteúdo correspondente
            const conteudo = document.getElementById(aba);
            if (conteudo) {
                conteudo.classList.add('ativo');
            }
        });
    });
}

/* ================================
   PÁGINA DO CARRINHO
   ================================ */

function inicializarPaginaCarrinho() {
    // Carregar itens do carrinho
    carregarItensCarrinho();
    
    // Atualizar resumo do pedido
    atualizarResumoPedido();
    
    // Configurar eventos
    configurarEventosCarrinho();
    
    // Carregar produtos recomendados
    carregarProdutosRecomendados();
}

// Carregar itens do carrinho
function carregarItensCarrinho() {
    const containerItens = document.getElementById('itensCarrinho');
    const quantidadeItens = document.getElementById('quantidadeItens');
    
    if (!containerItens) return;
    
    if (carrinho.length === 0) {
        // Carrinho vazio
        containerItens.innerHTML = `
            <div class="carrinho-vazio">
                <i class="fas fa-shopping-cart"></i>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos para ver os itens aqui</p>
                <a href="index.html" class="btn btn-primario">Continuar Comprando</a>
            </div>
        `;
        
        if (quantidadeItens) {
            quantidadeItens.textContent = '0';
        }
        return;
    }
    
    // Limpar container
    containerItens.innerHTML = '';
    
    // Adicionar itens
    let totalItens = 0;
    
    carrinho.forEach(item => {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (!produto) return;
        
        totalItens += item.quantidade;
        
        const itemElemento = criarElementoItemCarrinho(produto, item);
        containerItens.appendChild(itemElemento);
    });
    
    if (quantidadeItens) {
        quantidadeItens.textContent = totalItens.toString();
    }
}

// Criar elemento de item do carrinho
function criarElementoItemCarrinho(produto, itemCarrinho) {
    const div = document.createElement('div');
    div.className = 'item-carrinho';
    div.dataset.id = produto.id;
    
    const precoTotal = produto.preco * itemCarrinho.quantidade;
    const precoFormatado = formatarMoeda(produto.preco);
    const precoTotalFormatado = formatarMoeda(precoTotal);
    
    div.innerHTML = `
        <div class="imagem-item-carrinho">
            <img src="${produto.imagens[0]}" alt="${produto.nome}">
        </div>
        <div class="info-item-carrinho">
            <h3><a href="produto.html?id=${produto.id}">${produto.nome}</a></h3>
            <div class="preco-item">${precoFormatado}</div>
        </div>
        <div class="controles-item">
            <div class="quantidade-item">
                <button class="btn-quantidade diminuir" data-id="${produto.id}">-</button>
                <span class="quantidade-valor">${itemCarrinho.quantidade}</span>
                <button class="btn-quantidade aumentar" data-id="${produto.id}">+</button>
            </div>
            <div class="preco-total">${precoTotalFormatado}</div>
            <button class="btn-remover" data-id="${produto.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Configurar eventos
    const btnDiminuir = div.querySelector('.diminuir');
    const btnAumentar = div.querySelector('.aumentar');
    const btnRemover = div.querySelector('.btn-remover');
    
    if (btnDiminuir) {
        btnDiminuir.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            alterarQuantidadeItem(id, -1);
        });
    }
    
    if (btnAumentar) {
        btnAumentar.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            alterarQuantidadeItem(id, 1);
        });
    }
    
    if (btnRemover) {
        btnRemover.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removerDoCarrinho(id);
        });
    }
    
    return div;
}

// Configurar eventos do carrinho
function configurarEventosCarrinho() {
    // Limpar carrinho
    const btnLimparCarrinho = document.getElementById('limparCarrinho');
    if (btnLimparCarrinho) {
        btnLimparCarrinho.addEventListener('click', limparCarrinho);
    }
    
    // Aplicar cupom
    const btnAplicarCupom = document.getElementById('aplicarCupom');
    if (btnAplicarCupom) {
        btnAplicarCupom.addEventListener('click', aplicarCupom);
    }
    
    // Cupons disponíveis
    document.querySelectorAll('.cupons-disponiveis .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cupom = this.getAttribute('data-cupom');
            const desconto = parseFloat(this.getAttribute('data-desconto'));
            const minimo = parseFloat(this.getAttribute('data-minimo'));
            
            aplicarCupomDireto(cupom, desconto, minimo);
        });
    });
    
    // Finalizar compra
    const btnFinalizarCompra = document.getElementById('finalizarCompra');
    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener('click', finalizarCompra);
    }
}

// Atualizar resumo do pedido
function atualizarResumoPedido() {
    // Calcular subtotal
    let subtotal = 0;
    carrinho.forEach(item => {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (produto) {
            subtotal += produto.preco * item.quantidade;
        }
    });
    
    // Calcular frete (grátis acima de R$ 500)
    let frete = subtotal >= 500 ? 0 : 29.90;
    
    // Aplicar cupom se existir
    let descontoCupom = 0;
    if (cupomAplicado && subtotal >= cupomAplicado.minimo) {
        descontoCupom = (subtotal * cupomAplicado.desconto) / 100;
    }
    
    // Calcular total
    const total = subtotal + frete - descontoCupom;
    
    // Atualizar elementos
    document.getElementById('subtotal').textContent = formatarMoeda(subtotal);
    document.getElementById('frete').textContent = formatarMoeda(frete);
    
    // Mostrar/ocultar frete grátis
    const freteGratis = document.getElementById('freteGratis');
    if (freteGratis) {
        if (frete === 0) {
            freteGratis.classList.remove('oculto');
        } else {
            freteGratis.classList.add('oculto');
        }
    }
    
    // Atualizar cupom se aplicado
    const cupomAplicadoElemento = document.getElementById('cupomAplicado');
    if (cupomAplicado) {
        document.getElementById('cupomNome').textContent = cupomAplicado.nome;
        document.getElementById('descontoCupom').textContent = formatarMoeda(descontoCupom);
        cupomAplicadoElemento.classList.remove('oculto');
    } else {
        cupomAplicadoElemento.classList.add('oculto');
    }
    
    // Atualizar total
    document.getElementById('totalPedido').textContent = formatarMoeda(total);
}

// Aplicar cupom
function aplicarCupom() {
    const inputCupom = document.getElementById('codigoCupom');
    if (!inputCupom) return;
    
    const codigo = inputCupom.value.trim().toUpperCase();
    
    // Verificar cupons válidos
    const cupons = [
        { nome: 'BLACKFRIDAY', desconto: 15, minimo: 500 },
        { nome: 'TECH10', desconto: 10, minimo: 0 }
    ];
    
    const cupomValido = cupons.find(c => c.nome === codigo);
    
    if (cupomValido) {
        cupomAplicado = cupomValido;
        exibirNotificacao(`Cupom ${codigo} aplicado com sucesso!`, 'sucesso');
        inputCupom.value = '';
    } else {
        cupomAplicado = null;
        exibirNotificacao('Cupom inválido ou expirado.', 'erro');
    }
    
    // Atualizar resumo
    atualizarResumoPedido();
}

// Aplicar cupom diretamente
function aplicarCupomDireto(cupom, desconto, minimo) {
    cupomAplicado = { nome: cupom, desconto: desconto, minimo: minimo };
    exibirNotificacao(`Cupom ${cupom} aplicado com sucesso!`, 'sucesso');
    atualizarResumoPedido();
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        exibirNotificacao('Adicione produtos ao carrinho antes de finalizar a compra.', 'erro');
        return;
    }
    
    // Simular processamento
    exibirNotificacao('Processando sua compra...', 'info');
    
    setTimeout(() => {
        // Limpar carrinho
        carrinho = [];
        cupomAplicado = null;
        salvarCarrinho();
        atualizarContadorCarrinho();
        
        // Atualizar interface
        carregarItensCarrinho();
        atualizarResumoPedido();
        
        // Exibir mensagem de sucesso
        exibirNotificacao('Compra realizada com sucesso! Obrigado por comprar na TechStore.', 'sucesso');
        
        // Redirecionar para página inicial após 3 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }, 2000);
}

// Carregar produtos recomendados
function carregarProdutosRecomendados() {
    const gridRecomendados = document.getElementById('produtosRecomendados');
    if (!gridRecomendados) return;
    
    // Selecionar produtos aleatórios (excluindo os que já estão no carrinho)
    const produtosNoCarrinho = carrinho.map(item => item.produtoId);
    const produtosDisponiveis = produtos.filter(p => !produtosNoCarrinho.includes(p.id));
    
    // Selecionar até 4 produtos
    const recomendados = [...produtosDisponiveis]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    
    // Limpar grid
    gridRecomendados.innerHTML = '';
    
    // Adicionar produtos recomendados
    recomendados.forEach(produto => {
        const produtoElemento = criarElementoProduto(produto);
        gridRecomendados.appendChild(produtoElemento);
    });
}

/* ================================
   GERENCIAMENTO DO CARRINHO
   ================================ */

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId, quantidade = 1, comprarAgora = false) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;
    
    // Verificar estoque
    if (produto.estoque < quantidade) {
        exibirNotificacao(`Desculpe, temos apenas ${produto.estoque} unidade(s) em estoque.`, 'erro');
        return;
    }
    
    // Verificar se produto já está no carrinho
    const itemIndex = carrinho.findIndex(item => item.produtoId === produtoId);
    
    if (itemIndex >= 0) {
        // Atualizar quantidade
        const novaQuantidade = carrinho[itemIndex].quantidade + quantidade;
        
        if (novaQuantidade > produto.estoque) {
            exibirNotificacao(`Quantidade máxima disponível: ${produto.estoque}`, 'erro');
            return;
        }
        
        carrinho[itemIndex].quantidade = novaQuantidade;
    } else {
        // Adicionar novo item
        carrinho.push({
            produtoId: produtoId,
            quantidade: quantidade
        });
    }
    
    // Salvar e atualizar
    salvarCarrinho();
    atualizarContadorCarrinho();
    exibirNotificacao(`${produto.nome} adicionado ao carrinho!`, 'sucesso');
    
    // Redirecionar para carrinho se "Comprar Agora"
    if (comprarAgora) {
        setTimeout(() => {
            window.location.href = 'carrinho.html';
        }, 1000);
    }
}

// Alterar quantidade de um item
function alterarQuantidadeItem(produtoId, alteracao) {
    const itemIndex = carrinho.findIndex(item => item.produtoId === produtoId);
    if (itemIndex < 0) return;
    
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;
    
    const novaQuantidade = carrinho[itemIndex].quantidade + alteracao;
    
    if (novaQuantidade < 1) {
        // Remover item se quantidade for zero
        removerDoCarrinho(produtoId);
        return;
    }
    
    if (novaQuantidade > produto.estoque) {
        exibirNotificacao(`Quantidade máxima disponível: ${produto.estoque}`, 'erro');
        return;
    }
    
    carrinho[itemIndex].quantidade = novaQuantidade;
    salvarCarrinho();
    atualizarContadorCarrinho();
    
    // Recarregar página do carrinho se estiver nela
    if (document.querySelector('.pagina-carrinho')) {
        carregarItensCarrinho();
        atualizarResumoPedido();
    }
}

// Remover produto do carrinho
function removerDoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;
    
    const itemIndex = carrinho.findIndex(item => item.produtoId === produtoId);
    if (itemIndex >= 0) {
        carrinho.splice(itemIndex, 1);
        salvarCarrinho();
        atualizarContadorCarrinho();
        exibirNotificacao(`${produto.nome} removido do carrinho.`, 'info');
        
        // Recarregar página do carrinho se estiver nela
        if (document.querySelector('.pagina-carrinho')) {
            carregarItensCarrinho();
            atualizarResumoPedido();
        }
    }
}

// Limpar carrinho
function limparCarrinho() {
    if (carrinho.length === 0) return;
    
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        carrinho = [];
        cupomAplicado = null;
        salvarCarrinho();
        atualizarContadorCarrinho();
        
        if (document.querySelector('.pagina-carrinho')) {
            carregarItensCarrinho();
            atualizarResumoPedido();
        }
        
        exibirNotificacao('Carrinho limpo com sucesso.', 'info');
    }
}

// Atualizar contador do carrinho no cabeçalho
function atualizarContadorCarrinho() {
    const contadores = document.querySelectorAll('.contador-carrinho');
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    contadores.forEach(contador => {
        contador.textContent = totalItens.toString();
        contador.style.display = totalItens > 0 ? 'flex' : 'none';
    });
}

/* ================================
   FUNÇÕES AUXILIARES
   ================================ */

// Obter nome da categoria
function obterNomeCategoria(categoria) {
    const categorias = {
        'smartphone': 'Smartphones',
        'notebook': 'Notebooks',
        'audio': 'Áudio',
        'games': 'Games',
        'tv': 'TV & Vídeo',
        'smartwatch': 'Smartwatches',
        'tablet': 'Tablets'
    };
    
    return categorias[categoria] || categoria;
}

// Formatar moeda
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Exibir notificação
function exibirNotificacao(mensagem, tipo = 'info') {
    // Remover notificação existente
    const notificacaoExistente = document.querySelector('.notificacao-flutuante');
    if (notificacaoExistente) {
        document.body.removeChild(notificacaoExistente);
    }
    
    // Criar elemento
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao-flutuante ${tipo}`;
    
    // Ícone baseado no tipo
    let icone = 'info-circle';
    if (tipo === 'sucesso') icone = 'check-circle';
    if (tipo === 'erro') icone = 'exclamation-circle';
    if (tipo === 'aviso') icone = 'exclamation-triangle';
    
    notificacao.innerHTML = `
        <i class="fas fa-${icone}"></i>
        <span>${mensagem}</span>
        <button class="fechar-notificacao">&times;</button>
    `;
    
    // Estilos CSS para a notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--bg-cartao);
        color: var(--cor-texto);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--sombra-hover);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid var(--${tipo === 'sucesso' ? 'sucesso' : tipo === 'erro' ? 'perigo' : tipo === 'aviso' ? 'aviso' : 'info'});
    `;
    
    // Adicionar estilos para os ícones
    const estilo = document.createElement('style');
    estilo.textContent = `
        .notificacao-flutuante i {
            font-size: 1.2rem;
        }
        .notificacao-flutuante.sucesso i { color: var(--cor-sucesso); }
        .notificacao-flutuante.erro i { color: var(--cor-perigo); }
        .notificacao-flutuante.aviso i { color: var(--cor-aviso); }
        .notificacao-flutuante.info i { color: var(--cor-info); }
        
        .fechar-notificacao {
            background: none;
            border: none;
            color: var(--cor-texto-claro);
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            line-height: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(estilo);
    
    // Adicionar ao body
    document.body.appendChild(notificacao);
    
    // Configurar botão fechar
    const btnFechar = notificacao.querySelector('.fechar-notificacao');
    btnFechar.addEventListener('click', () => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notificacao)) {
                document.body.removeChild(notificacao);
            }
        }, 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notificacao)) {
            notificacao.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notificacao)) {
                    document.body.removeChild(notificacao);
                }
            }, 300);
        }
    }, 5000);
}

// Iniciar contador promocional
function iniciarContadorPromocao() {
    const diasElemento = document.getElementById('dias');
    const horasElemento = document.getElementById('horas');
    const minutosElemento = document.getElementById('minutos');
    const segundosElemento = document.getElementById('segundos');
    
    if (!diasElemento) return;
    
    // Data final: 3 dias a partir de agora
    const dataFinal = new Date();
    dataFinal.setDate(dataFinal.getDate() + 3);
    
    function atualizarContador() {
        const agora = new Date();
        const diferenca = dataFinal - agora;
        
        if (diferenca <= 0) {
            // Promoção encerrada
            diasElemento.textContent = '00';
            horasElemento.textContent = '00';
            minutosElemento.textContent = '00';
            segundosElemento.textContent = '00';
            return;
        }
        
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
        
        diasElemento.textContent = dias.toString().padStart(2, '0');
        horasElemento.textContent = horas.toString().padStart(2, '0');
        minutosElemento.textContent = minutos.toString().padStart(2, '0');
        segundosElemento.textContent = segundos.toString().padStart(2, '0');
    }
    
    // Atualizar a cada segundo
    atualizarContador();
    setInterval(atualizarContador, 1000);
    document.getElementById("year").textContent = new Date().getFullYear();
}

