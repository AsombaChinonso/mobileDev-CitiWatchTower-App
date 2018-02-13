  App.controller('home', function (page) {

  });

  App.controller('page2', page2_Controller);
  //>>>>Simple Login functionality, requires no database or server authenitcation
  function page2_Controller(page) {
      $(page)
          .find('.verify')
          .on('click', verification);

      function verification() {
          console.log('verify have been clicked');

          var user = document.getElementById('enter_email').value;
          var password = document.getElementById('enter_password').value;

          if (user == 'Emmanuel' && password == '12345') {
              alert('Welcome Emmanuel');
              App.load('page3');
          } else if (user == '' && password == '') {
              alert('You must enter a password to proceed!' + '\n' + 'username is Emmanuel & password = 12345');
          } else {
              alert('Username or password is incorrect!');
          }
      }
  }



  App.controller('page3', page3_Controller);

  function page3_Controller(page) {
      $(page)
          .find('.submit')
          .on('click', submit_entries);

      ////send post to wordpress
      function submit_entries() {
          console.log('submit have been clicked');

          var username = document.getElementById('enter_username').value;
          var report = document.getElementById('enter_report').value;
          var status = document.getElementById('enter_status').value;

          console.log(username, report, status);
          alert(username + report + status);

          //var final_report = username + report + status;

          var final_report = {
              title1: username,
              content1: report,
              status1: status
          }



          if (localStorage.getItem('issues') == null) {
              var issues = [];
              issues.push(final_report);
              localStorage.setItem('issues', JSON.stringify(issues));
          } else {
              var issues = JSON.parse(localStorage.getItem('issues'));
              issues.push(final_report);
              localStorage.setItem('issues', JSON.stringify(issues));
          }

          console.log(issues);

          show_data();

          document.getElementById('enter_username').value = '';
          document.getElementById('enter_report').value = '';
          document.getElementById('enter_status').value = '';



          ////post to wordpress
          var total_report = JSON.stringify({
              title: username,
              content: report,
              status: status
          });
          console.log(total_report);

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;

          xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4) {
                  console.log(this.responseText);
              }
          });

          xhr.open("POST", "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/posts");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Basic YXNvbWJhOnNKaXBvOEh4Z2JiaVVmcGpEZHFlNEQ3bQ==");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "29673597-3526-3b56-9329-85bdc097df3e");

          xhr.send(total_report);

          show_data();
      }

      ////prints out all new status     onclick="Delete(\''+id+'\')"
      function show_data() {
          console.log('show_data was displayed');

          var issues = JSON.parse(localStorage.getItem('issues'));
          var issuesListe = document.getElementById('holder');

          holder.innerHTML = '';

          for (var i = 0; i < issues.length; i++) {
              var title1 = issues[i].title1;
              var content1 = issues[i].content1;
              var status1 = issues[i].status1;

              holder.innerHTML += '<div class="app-section">' +
                  '<div class="font-2">' +
                  '<h5>Name: ' + title1 + '</h5>' +
                  '<h5>Status: ' + status1 + '</h5>' +
                  '</div>' +
                  '<h4>' + '<p>' + content1 + '</h4>' +
                  '<button onclick="Delete()">Done</button>' +

                  '</div>';
          }
      }

  }

  function Delete() {
      console.log('delete was displayed');
      holder.innerHTML = '';
  }



  /**
      

  **/






  App.controller('page4', page4_Controller);
////  WORKING  GET REQUEST 
  function page4_Controller(page) {
      $(page)
          .find('.fetch')
          .on('click', fetch_data);

      function fetch_data() {
          console.log('fetch ready!');

          $.ajax({
              type: "GET",
              url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/posts/70",
              cache: false,
              success: function (data) {
                  console.log(data);
                  console.log(data.date);
                  console.log(data.title.rendered);
                  console.log(data.content.rendered);

                  var date3 = data.date;
                  var title3 = data.title.rendered;
                  var content3 = data.content.rendered;
                  var final_content_education = date3 + title3 + content3;


                  document.getElementById('first').innerHTML = final_content_education;

                  //console.log(third_content);
                  //third_content.innerHTML = final_content_education;

              }
          });






        /*
          $.ajax({
              type: "GET",
              url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages",
              cache: false,
              success: function (data) {
                  console.log(data);
                  //console.log(data.date);
                  ////console.log(data.status);
                  // console.log(data.title.rendered);
                  //console.log(data.content.rendered);

                  var date = data;
                  //var status = data.status;
                  //var title = data.title.rendered;
                  ///var content = data.content.rendered;
                  //var final_content_home = date + status + title + content;

                  document.getElementById('first').innerHTML = date;
                  //first_content.innerHTML = final_content_home;

              }
          });*/


      }


  }



  try {
      App.restore();
  } catch (err) {
      App.load('home');
  }




  function fetch_data() {
      $.ajax({
          type: "GET",
          url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/posts",
          cache: false,
          success: function (data) {
              console.log(data);
              console.log(data.date);
              console.log(data.status);
              console.log(data.title.rendered);
              console.log(data.content.rendered);

              var date = data.date;
              var status = data.status;
              var title = data.title.rendered;
              var content = data.content.rendered;
              var final_content_home = date + status + title + content;

              document.getElementById('first').innerHTML = final_content_home;
              //first_content.innerHTML = final_content_home;

          }
      });
  }




  ///PAGE FOUR



  /*
  
  
  
  document.getElementById('submit').addEventListener('click', function () {
      console.log('submit have been clicked');

      var username = document.getElementById('enter_username').value;
      var report = document.getElementById('enter_report').value;
      var status = document.getElementById('enter_status').value;

      console.log(username, report, status);
      alert(username, report, status);


  });
  
  
  
  
  
  
  $.ajax({
          type: "POST",
          url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/posts",
          cache: false,
          success: function (data) {
              console.log(data);
              
             

          }
      });
  
  function _(x) {
      return document.getElementById(x);
  }

  function tab_slide() {
      _("first").style.display = "block";
      _("second").style.display = "none";
      _("third").style.display = "none";
      _("fourth").style.display = "none";

      _("tab1").style.background = "#0A0A0A";
      _("tab1").style.color = "#fff";
      _("tab2").style.background = "#333333";
      _("tab2").style.color = "#fff";
      _("tab3").style.background = "#333333";
      _("tab3").style.color = "#fff";
      _("tab4").style.background = "#333333";
      _("tab4").style.color = "#fff";
      fetch_data();
  }

  function tab_one() {
      console.log('tab_one have been called');
      _("first").style.display = "block";
      _("second").style.display = "none";
      _("third").style.display = "none";
      _("fourth").style.display = "none";

      _("tab1").style.background = "#0A0A0A";
      _("tab1").style.color = "#fff";
      _("tab2").style.background = "#333333";
      _("tab2").style.color = "#fff";
      _("tab3").style.background = "#333333";
      _("tab3").style.color = "#fff";
      _("tab4").style.background = "#333333";
      _("tab4").style.color = "#fff";

      fetch_data();
  }

  function tab_two() {
      console.log('tab_two have been called');
      _("first").style.display = "none";
      _("second").style.display = "block";
      _("third").style.display = "none";
      _("fourth").style.display = "none";

      _("tab1").style.background = "#333333";
      _("tab1").style.color = "#fff";
      _("tab2").style.background = "#0A0A0A";
      _("tab2").style.color = "#fff";
      _("tab3").style.background = "#333333";
      _("tab3").style.color = "#fff";
      _("tab4").style.background = "#333333";
      _("tab4").style.color = "#fff";

      fetch_data_skills();
  }

  function tab_three() {
      console.log('tab_three have been called');
      _("first").style.display = "none";
      _("second").style.display = "none";
      _("third").style.display = "block";
      _("fourth").style.display = "none";

      _("tab1").style.background = "#333333";
      _("tab1").style.color = "#fff";
      _("tab2").style.background = "#333333";
      _("tab2").style.color = "#fff";
      _("tab3").style.background = "#0A0A0A";
      _("tab3").style.color = "#fff";
      _("tab4").style.background = "#333333";
      _("tab4").style.color = "#fff";

      fetch_data_education();
  }

  function tab_four() {
      console.log('tab_four have been called');
      _("first").style.display = "none";
      _("second").style.display = "none";
      _("third").style.display = "none";
      _("fourth").style.display = "block";

      _("tab1").style.background = "#333333";
      _("tab1").style.color = "#fff";
      _("tab2").style.background = "#333333";
      _("tab2").style.color = "#fff";
      _("tab3").style.background = "#333333";
      _("tab3").style.color = "#fff";
      _("tab4").style.background = "#0A0A0A";
      _("tab4").style.color = "#fff";
  }




  function fetch_data() {
      $.ajax({
          type: "GET",
          url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages/7",
          cache: false,
          success: function (data) {
              console.log(data);
              console.log(data.date);
              console.log(data.title.rendered);
              console.log(data.content.rendered);

              var date = data.date;
              var title = data.title.rendered;
              var content = data.content.rendered;
              var final_content_home = date + title + content;

              var first_content = document.getElementById('first');
              first_content.innerHTML = final_content_home;

          }
      });
  }



  ///PAGE TWO
  function fetch_data_skills() {
      $.ajax({
          type: "GET",
          url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages/9",
          cache: false,
          success: function (data) {
              console.log(data);
              console.log(data.date);
              console.log(data.title.rendered);
              console.log(data.content.rendered);

              var date = data.date;
              var title = data.title.rendered;
              var content = data.content.rendered;
              var final_content_home = date + title + content;

              var first_content = document.getElementById('second');
              first_content.innerHTML = final_content_home;

          }
      });
  }


  //PAGE THREE
  function fetch_data_education() {
      $.ajax({
          type: "GET",
          url: "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages/52",
          cache: false,
          success: function (data) {
              console.log(data);
              console.log(data.date);
              console.log(data.title.rendered);
              console.log(data.content.rendered);

              var date = data.date;
              var title = data.title.rendered;
              var content = data.content.rendered;
              var final_content_home = date + title + content;

              var first_content = document.getElementById('third');
              first_content.innerHTML = final_content_home;

          }
      });
  }

  
   function fetch_data(ev) {
      //(e || window.event).preventDefault();
      var type = "GET";
      var url = "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages/7";
      var cache = "true";
      var first_content = document.getElementById('first'),
          xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function (ev) {
          if (xhr.readyState == 4 && xhr.status == 200) {
              
              
              
              first_content.innerHTML = xhr.responseText;
          }
      }

      xhr.open(type, url, cache);
      xhr.setRequestHeader('Content-type', 'text/html');
      
      xhr.addEventListener('loadstart', loadstartCallback);
      xhr.addEventListener('loadstop', loadstopCallback);
      xhr.addEventListener('loadloaderror', loaderrorCallback);
      xhr.addEventListener('exit', exitCallback);

      function loadstartCallback(event) {
          console.log('Loading started: ' + event.url);
          alert('Loading started: ' + event.url);
      }

      function loadstopCallback(event) {
          console.log('Loading finished: ' + event.url);
          alert('Loading finished: ' + event.url);
      }

      function loaderrorCallback(error) {
          console.log('Loading error: ' + error.message);
          alert('Loading error: ' + error.message);
      }

      function exitCallback() {
          console.log('Browser is closed...');
          alert('Browser is closed...');
      }
      
      xhr.send();
  }

  
  
  
  
  function fetch_data_skills(even) {
      //(e || window.event).preventDefault();
      var type = "GET";
      var url = "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages/9";
      var cache = "true";
      var second_content = document.getElementById('second'),
          xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function (even) {
          if (xhr.readyState == 4 && xhr.status == 200) {
              second_content.innerHTML = xhr.responseText;
          }
      }

      xhr.open(type, url, cache);
      xhr.setRequestHeader('Content-type', 'text/html');

      xhr.addEventListener('loadstart', loadstartCallback);
      xhr.addEventListener('loadstop', loadstopCallback);
      xhr.addEventListener('loadloaderror', loaderrorCallback);
      xhr.addEventListener('exit', exitCallback);

      function loadstartCallback(event) {
          console.log('Loading started: ' + event.url);
          alert('Loading started: ' + event.url);
      }

      function loadstopCallback(event) {
          console.log('Loading finished: ' + event.url);
          alert('Loading finished: ' + event.url);
      }

      function loaderrorCallback(error) {
          console.log('Loading error: ' + error.message);
          alert('Loading error: ' + error.message);
      }

      function exitCallback() {
          console.log('Browser is closed...');
          alert('Browser is closed...');
      }

      xhr.send();
  }

  function fetch_data_education(event) {
      //(e || window.event).preventDefault();
      var type = "GET";
      var url = "http://asombaemmanuel.mywebcommunity.org/wp-json/wp/v2/pages/52";
      var cache = "true";
      var third_content = document.getElementById('third'),
          xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function (event) {
          if (xhr.readyState == 4 && xhr.status == 200) {
              third_content.innerHTML = xhr.responseText;
          }
      }

      xhr.open(type, url, cache);
      xhr.setRequestHeader('Content-type', 'text/html');


      xhr.addEventListener('loadstart', loadstartCallback);
      xhr.addEventListener('loadstop', loadstopCallback);
      xhr.addEventListener('loadloaderror', loaderrorCallback);
      xhr.addEventListener('exit', exitCallback);

      function loadstartCallback(event) {
          console.log('Loading started: ' + event.url);
          alert('Loading started: ' + event.url);
      }

      function loadstopCallback(event) {
          console.log('Loading finished: ' + event.url);
          alert('Loading finished: ' + event.url);
      }

      function loaderrorCallback(error) {
          console.log('Loading error: ' + error.message);
          alert('Loading error: ' + error.message);
      }

      function exitCallback() {
          console.log('Browser is closed...');
          alert('Browser is closed...');
      }

      xhr.send();
  }
  */
