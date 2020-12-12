var searchInput;
var signInAuth = false;

$(function () {
  $("#search-btn").on("click", function (e) {
    var dropDownOption = $("#dropDownOptions :selected").val();
    var searchInput = $("#cocktailSearch").val();
    e.preventDefault();
    $.get(`/api/${dropDownOption}/${searchInput}`).then(function(){
      window.location.replace(`/api/${dropDownOption}/${searchInput}`);
  })
  });
});


$(function () {
  $(".saveBtn").on("click", function (e) {        
    var saveBtn = this.id;
    $(`#${saveBtn}`).attr("style","background-color: red !important");
    $(`#${saveBtn}`).html("Drink Saved!")
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/drinks/create",
      data: {
        drinkId: this.id
      },
      success: function (result) {
        console.log(result);
        console.log("the result of the success");
        $(`#${saveBtn}`).html("Save for Later")
        $(`#${saveBtn}`).attr("style","background-color:  rgb(71, 209, 101)!important");
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});

$(function () {
  $(".drinkDetails").on("click", function (e) {
    console.log(e.target.id);
    var drinkId = e.target.id;
    console.log(drinkId);
    e.preventDefault();
    const link = `/drinkDetails/${drinkId}`;
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});


$(function () {
  $("#logInBtn").on("click", function (e) {
    e.preventDefault();
    const link = "/login";
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        console.log(signInAuth);
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});


$(function () {
  $("#logInSubmit").on("click", function (e) {
    var userName = $("#userNameInput").val();
    var password = $("#passwordInput").val();
    e.preventDefault();
    const link = "/login";
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        console.log(signInAuth);
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});


$(function () {
  $("#createAccount").on("click", function (e) {
    var userName = $("#userNameInput").val();
    var password = $("#passwordInput").val();
    e.preventDefault();
    const link = `/createAccount`;
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        console.log(signInAuth);
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});


$(function () {
  $("#createBtn").on("click", function (e) {
    var userName = $("#userNameInput").val();
    var password = $("#passwordInput").val();
    e.preventDefault();
    const link = `/createAccount/${userName}/${password}`;
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});


$(function () {
  $("#emailBtn").on("click", function (e) {
    var userName = $("#userNameInput").val();
    var password = $("#passwordInput").val();
    e.preventDefault();
    const link = `/email`
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});

$(function () {
  $("#sendEmailBtn").on("click", function (e) {
    var email = $("#inputEmail").val();
    e.preventDefault();
    const link = `/`
    $.ajax({
      type: "GET",
      url: `/email/${email}`,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        window.location.href = link;
        alert("Email sent successfully");
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});

$(function () {
  $("#savedDrinksBtn").on("click", function (e) {
    console.log("hello");
    e.preventDefault();
    const link = `/db/savedDrinks`
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        console.log(result);
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});


$(function () {
  $(".drinkDetailsLink").on("click", function (e) {
    // alert(e.target.id);
    var drinkName = e.target.id;
    e.preventDefault();
    const link = `/search/drinkDetails/${drinkName}`;
    $.ajax({
      type: "GET",
      url: link,
      data: {
        drinkId: e.target.id
      },
      success: function (result) {
        window.location.href = link;
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});

// $(function () {
//   $(".removebtn").on("click", function (e) {
//     alert(this.id);
//     // var drinkName = e.target.id;
//     e.preventDefault();
//     const link = `/api/drinks/delete`;
//     $.ajax({
//       type: "POST",
//       url: link,
//       data: {
//         drinkId: e.target.id
//       },
//       success: function (result) {
//         window.location.href = link;
//       },
//       error: function (result) {
//         alert('error');
//       }
//     });
//   });
// });
$(function () {
  $(".removebtn").on("click", function (e) {  
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/drinks/delete",
      data: {
        drinkId: this.id
      },
      success: function (result) {
        // console.log("AHHHHH YAAAAA!!!!")
        window.location.reload();
      },
      error: function (result) {
        alert('error');
      }
    });
  });
});





function test(res) {
  console.log(res);
}