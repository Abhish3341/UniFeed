// Mock finance data - replace with actual API integration
const mockFinanceData = [
  {
    id: '1',
    symbol: 'AAPL',
    price: 175.43,
    change: 2.31,
    changePercent: 1.34,
    volume: 45678900,
    marketCap: 2800000000000,
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    symbol: 'GOOGL',
    price: 127.85,
    change: -1.22,
    changePercent: -0.94,
    volume: 23456789,
    marketCap: 1600000000000,
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    symbol: 'MSFT',
    price: 378.85,
    change: 5.67,
    changePercent: 1.52,
    volume: 34567890,
    marketCap: 2900000000000,
    timestamp: new Date().toISOString(),
  },
];

const getStockData = async (req, res) => {
  try {
    const { symbols } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredData = mockFinanceData;
    if (symbols && typeof symbols === 'string') {
      const symbolList = symbols.split(',').map(s => s.trim().toUpperCase());
      filteredData = mockFinanceData.filter(
        item => symbolList.includes(item.symbol)
      );
    }
    
    const response = {
      data: filteredData,
      success: true,
      timestamp: new Date().toISOString(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      data: [],
      success: false,
      message: 'Failed to fetch stock data',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
};

const getMarketOverview = async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const response = {
      data: mockFinanceData,
      success: true,
      timestamp: new Date().toISOString(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      data: [],
      success: false,
      message: 'Failed to fetch market overview',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  getStockData,
  getMarketOverview
};