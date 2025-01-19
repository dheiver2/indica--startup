'use client'; // Indica que este é um componente do lado do cliente

import { useState, useEffect } from 'react';
import { FaCopy, FaMoon, FaSun } from 'react-icons/fa'; // Ícones
import { FaBullseye, FaEye, FaHandshake } from 'react-icons/fa6';

export default function Home() {
  const [rentValue, setRentValue] = useState<number | ''>('');
  const [commissionPercentage, setCommissionPercentage] = useState<number | ''>('');
  const [commission, setCommission] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<
    { rent: number; percentage: number; commission: number }[]
  >([]);

  // Carregar o histórico do localStorage ao montar o componente
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Salvar o histórico no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
  }, [history]);

  const handleCalculate = async () => {
    if (!rentValue || !commissionPercentage) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentValue, commissionPercentage }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao calcular a comissão.');
      }
  
      const data = await response.json();
      setCommission(data.commission);
      setError(null);
  
      // Adicionar ao histórico
      setHistory((prev) => [
        ...prev,
        {
          rent: rentValue,
          percentage: commissionPercentage,
          commission: data.commission,
        },
      ]);
    } catch (err) {
      setError('Erro ao calcular a comissão. Tente novamente.');
      setCommission(null);
    }
  };

  const handleCopyResult = () => {
    if (commission !== null) {
      navigator.clipboard.writeText(`R$ ${commission.toFixed(2)}`);
      alert('Resultado copiado para a área de transferência!');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main
      className={`flex flex-col items-center min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Seção 1: Cabeçalho */}
      <header
        className={`w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white py-24 text-center ${
          darkMode ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Botão de Modo Escuro/Claro */}
          <button
            onClick={toggleDarkMode}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button>

          {/* Logo Criada com Código */}
          <div className="flex items-center justify-center mb-8">
            <div className="logo-container">
              <div className="logo-icon">
                <div className="house"></div>
                <div className="plus">+</div>
              </div>
              <span className="logo-text text-3xl font-bold">Indica+</span>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold mb-6">
            Ganhe Dinheiro Indicando Aluguéis de Imóveis
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Com a <strong>Indica+</strong>, você descobre quanto pode ganhar
            indicando imóveis para aluguel. Simples, rápido e sem complicações!
          </p>
          <a
            href="#simulador"
            className="inline-block bg-white text-blue-600 py-4 px-8 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            Calcule Agora
          </a>
        </div>
      </header>

      {/* Seção 2: Sobre a Marca */}
      <section
        className={`w-full py-20 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        } transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Sobre a <span className="text-blue-600">Indica+</span>
          </h2>
          <p
            className={`text-lg text-center mb-12 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            A <strong>Indica+</strong> nasceu com a missão de conectar pessoas a
            oportunidades de ganhar dinheiro de forma simples e segura. Nosso
            simulador foi criado para ajudar você a entender quanto pode ganhar
            indicando imóveis para aluguel, sem complicações.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Missão */}
            <div
              className={`p-8 rounded-xl text-center shadow-lg ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-white hover:bg-gray-100'
              } transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full">
                  <FaBullseye className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Missão</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Facilitar a vida de quem quer ganhar dinheiro indicando imóveis.
              </p>
            </div>

            {/* Card Visão */}
            <div
              className={`p-8 rounded-xl text-center shadow-lg ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-white hover:bg-gray-100'
              } transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full">
                  <FaEye className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Visão</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Ser a plataforma líder em indicações de aluguéis no Brasil.
              </p>
            </div>

            {/* Card Valores */}
            <div
              className={`p-8 rounded-xl text-center shadow-lg ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-white hover:bg-gray-100'
              } transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full">
                  <FaHandshake className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Valores</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Transparência, simplicidade e resultados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Benefícios */}
      <section
        className={`w-full py-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher a Indica+?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full p-4 w-12 h-12 mx-auto mb-4">
                💡
              </div>
              <h3 className="text-xl font-semibold mb-4">Simples de Usar</h3>
              <p className="text-gray-600">
                Nosso simulador é intuitivo e fácil de usar. Basta inserir os
                valores e ver o resultado.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full p-4 w-12 h-12 mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-semibold mb-4">Resultados Rápidos</h3>
              <p className="text-gray-600">
                Receba o cálculo da sua comissão em segundos, sem precisar de
                cadastro.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full p-4 w-12 h-12 mx-auto mb-4">
                🎁
              </div>
              <h3 className="text-xl font-semibold mb-4">100% Gratuito</h3>
              <p className="text-gray-600">
                Nosso simulador é totalmente gratuito e sem compromisso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Simulador */}
      <section
        id="simulador"
        className={`w-full py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Simule sua Comissão
          </h2>
          <div
            className={`p-8 rounded-lg shadow-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Valor do Aluguel (R$)
                </label>
                <input
                  type="number"
                  value={rentValue}
                  onChange={(e) => setRentValue(Number(e.target.value))}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 2000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Percentual de Comissão (%)
                </label>
                <input
                  type="number"
                  value={commissionPercentage}
                  onChange={(e) =>
                    setCommissionPercentage(Number(e.target.value))
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 5"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Calcular
              </button>

              {commission !== null && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md flex justify-between items-center">
                  <p className="text-green-700">
                    Você pode ganhar:{' '}
                    <strong>R$ {commission.toFixed(2)}</strong>
                  </p>
                  <button
                    onClick={handleCopyResult}
                    className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-all"
                  >
                    <FaCopy className="text-green-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Histórico de Cálculos */}
      <section
        className={`w-full py-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Histórico de Cálculos
          </h2>
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                }`}
              >
                <p className="text-gray-600">
                  Aluguel: <strong>R$ {item.rent.toFixed(2)}</strong>, Comissão:{' '}
                  <strong>{item.percentage}%</strong>, Ganho:{' '}
                  <strong>R$ {item.commission.toFixed(2)}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 6: Depoimentos */}
      <section
        className={`w-full py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que dizem nossos usuários
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Depoimento 1 */}
            <div
              className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="profile-icon bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  A
                </div>
                <p className="font-semibold">Ana Silva</p>
              </div>
              <p className="text-gray-600">
                &quot;Indiquei um imóvel para aluguel e ganhei uma comissão incrível!
                O processo foi simples e rápido.&quot;
              </p>
            </div>

            {/* Depoimento 2 */}
            <div
              className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="profile-icon bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  J
                </div>
                <p className="font-semibold">João Souza</p>
              </div>
              <p className="text-gray-600">
                &quot;Com o simulador, pude planejar minhas indicações e maximizar
                meus ganhos. Recomendo!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 7: Perguntas Frequentes (FAQ) */}
      <section
        className={`w-full py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <div
              className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <h3 className="font-semibold mb-2">Como funciona o simulador?</h3>
              <p className="text-gray-600">
                Basta inserir o valor do aluguel e o percentual de comissão. O
                simulador calculará automaticamente quanto você pode ganhar.
              </p>
            </div>
            <div
              className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <h3 className="font-semibold mb-2">Preciso me cadastrar?</h3>
              <p className="text-gray-600">
                Não! Nosso simulador é 100% gratuito e não requer cadastro.
              </p>
            </div>
            <div
              className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <h3 className="font-semibold mb-2">Quanto posso ganhar?</h3>
              <p className="text-gray-600">
                O valor da comissão depende do valor do aluguel e do percentual
                acordado. Use o simulador para descobrir!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 8: Chamada para Ação (CTA) Final */}
      <section
        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 text-center ${
          darkMode ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Comece a Ganhar Hoje Mesmo
          </h2>
          <p className="text-xl mb-8">
            Não perca tempo! Use nosso simulador e descubra quanto você pode
            ganhar indicando imóveis.
          </p>
          <a
            href="#simulador"
            className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-blue-50 transition-all"
          >
            Simular Agora
          </a>
        </div>
      </section>

      {/* Seção 9: Rodapé */}
      <footer
        className={`w-full ${
          darkMode ? 'bg-gray-900' : 'bg-gray-800'
        } text-white py-8`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Indica+. Todos os direitos
            reservados.
          </p>
          <p className="text-sm text-gray-400">
            Desenvolvido com ❤️ por [Sua Empresa]
          </p>
        </div>
      </footer>

      {/* Botão de Voltar ao Topo */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          ↑
        </button>
      )}

      {/* Estilos da Logo */}
      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .logo-icon {
          position: relative;
          width: 50px;
          height: 50px;
          background-color: #ffffff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          transition: transform 0.3s ease;
        }

        .logo-icon:hover {
          transform: scale(1.1);
        }

        .house {
          width: 30px;
          height: 20px;
          background-color: #3b82f6;
          position: relative;
        }

        .house::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 10px solid #3b82f6;
        }

        .plus {
          position: absolute;
          bottom: -10px;
          right: -10px;
          font-size: 20px;
          font-weight: bold;
          color: #3b82f6;
          background-color: #ffffff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo-text {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .logo-container:hover .logo-text {
          color: #fbbf24;
        }
      `}</style>
    </main>
  );
}
