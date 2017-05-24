const fetchJSON = function (url) {
  window.fetch(url)
    .then(function (res) { return res.json() })
    .then(function (res) {
      return res
    })
    .catch(function (e) {
      console.log(e)
    })
}

export default fetchJSON
