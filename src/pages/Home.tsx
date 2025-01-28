const Home = () => {
  return (
    <div>
      {/* <Navigation /> */}
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Green Shop
        </h1>
        <h2>We offer the opportunity to sell or purchase flowers.</h2>
        <p className="text-xl text-gray-600 mb-8">
          We have more than 1000 flowers available. You can find unique and
          luxurious flowers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Luxurious flowers</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Orxideya and Kamelia</p>
              <p className="text-gray-600">Peoniya and Ranunkulus</p>
              <p className="text-gray-600">Liliya and Gardenia</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Unique flowers</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Kadupul and Green Rose</p>
              <p className="text-gray-600">Juliet Rose and Parrot’s Beak </p>
              <p className="text-gray-600">Ghost Orchid and Middlemist Red</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
