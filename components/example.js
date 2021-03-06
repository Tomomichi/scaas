export default function() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlField = document.getElementById('urlField');
    const url = `https://scaas.vercel.app/api?url=${urlField.value}`;
    window.open(url, '_blank');
    urlField.value = "";
  }

  return (
    <section className="text-gray-700 body-font bg-gray-300">
      <div className="container px-5 py-12 mb-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">さっそく試してみる</h1>
        </div>
        <form className="flex flex-col sm:flex-row w-full justify-center" onSubmit={handleSubmit}>
          <input id="urlField" required className="leading-10 border-0 bg-white rounded sm:mr-4 border border-gray-400 focus:outline-none focus:border-pink-500 text-base px-4 flex-grow" placeholder="キャプチャしたいページのURL" type="url" />
          <button className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-md mt-4 sm:mt-0">実行</button>
        </form>
      </div>
    </section>
  )
}
