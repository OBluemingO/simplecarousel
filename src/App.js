import Carousel from './component/Carousel';

function App() {
  return (
    <>
      <Carousel show={3} infiniteLoop >
        <div>
          <div style={{ padding: 8 }}>
            <img src="http://via.placeholder.com/300X300" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="http://via.placeholder.com/300X300" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="http://via.placeholder.com/300X300" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="http://via.placeholder.com/300X300" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="http://via.placeholder.com/300X300" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <img src="http://via.placeholder.com/300X300" alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
      </Carousel>
    </>
  );
}

export default App;
