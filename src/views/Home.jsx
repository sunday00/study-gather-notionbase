import {useNavigate} from "react-router-dom";

const Home = () => {
  const redirect = useNavigate()

  return (
    <div className="home-wrap">
      <section className="hero min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">공부합니다.</h1>
            <p className="mb-5">공부하고, 방값 계산하고, 회식도 합니다. 할땐 하고 놀땐 잘 놀고, <br />계산은 깔끔하게</p>
            <button className="btn btn-primary" onClick={() => {redirect('/appointment')}}>이번주 모임 보기</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;