/* sorry for the late submission it took me some time to do this assignment after knowing the api is updated and in the this assingment 
  1) i implemented every functionality using the jquery 
  2) the serch box is working only before the click event is triggered and after the click event is triggered it is not working , i want the TA to validate my code
  and find the issue behind that and let me know in the comments of the assingment, thank you sir/madam.
*/


var url = "https://admin-panel-data-edyoda-sourav.vercel.app/admin/data";
$(() => {
  let promise = (url) =>
    new Promise((resolve, reject) => {
      $.get(url, (data) => resolve(data)).fail((err) => reject(err));
    });
  //rendering the table by use the api

  promise(url)
    .then((data) => {
      let activeitem = data[2];
      let infoContent = $("#info-content");
      infoContent.html(`
            <div><b>User selected:</b> ${activeitem.firstName}</div>
            <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quia nihil. Est, illum minima libero rerum, nihil distinctio placeat sint nam quae repellendus obcaecati delectus totam non odio. Sint, reprehenderit?
            </textarea>
        </div>
        <div><b>Address:</b>${activeitem.address.streetAddress}</div>
        <div><b>City:</b> ${activeitem.address.city}</div>
        <div><b>State:</b>${activeitem.address.state}</div>
        <div><b>Zip:</b>${activeitem.address.zip}</div>`);

      data.forEach((item) => {
        let tableData = $("#table-data");
        let tableROw = `
        <tr class="data-row">
          <td class="column1">${item.id}</td>
          <td class="column2">${item.firstName}</td>
          <td class="column3">${item.lastName}</td>
          <td class="column4">${item.email}</td>
          <td class="column5">${item.phone}</td>
        </tr>
        `;
        tableData.append(tableROw);

        //details implementation
        $("#table-data tr").eq(2).addClass("active");
        $("#table-data tr").on("click", (e) => {
          $("#table-data tr").removeClass();
          $(e.delegateTarget).addClass("active");
          let infoContent = $("#info-content");
          let rowId = $(e.delegateTarget).find("td:eq(0)").text();
          if (item.id == rowId) {
            infoContent.html(`
            <div><b>User selected:</b> ${item.firstName}</div>
            <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quia nihil. Est, illum minima libero rerum, nihil distinctio placeat sint nam quae repellendus obcaecati delectus totam non odio. Sint, reprehenderit?
            </textarea>
        </div>
        <div><b>Address:</b>${item.address.streetAddress}</div>
        <div><b>City:</b> ${item.address.city}</div>
        <div><b>State:</b>${item.address.state}</div>
        <div><b>Zip:</b>${item.address.zip}</div>`);
          }
        });
      });
    })
    .catch((err) => console.log(err));

  /// search implementation
  let searchInput = $("#search-box");
  searchInput.on("keyup", (e) => {
    let searchValue = e.target.value.toLowerCase();
    let tr = $(".data-row"); // selecting the table rows of class data-row
    tr.each((index, item) => {
      let firstName = $(item).find("td:eq(1)").text().toLowerCase();
      if (!firstName.includes(searchValue)) {
        $(item).css({
          display: "none",
        });
      }
      if (searchValue.length === 0 || firstName.includes(searchValue)) {
        $(item).css({
          display: "block",
        });
      }
    });
  });
});
