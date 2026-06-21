(function () {
  'use strict';

  /* Gallery filters */
  document.querySelectorAll('[data-gallery-filter]').forEach(function (bar) {
    var items = document.querySelectorAll('[data-gallery-item]');
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var filter = btn.getAttribute('data-filter');
      bar.querySelectorAll('[data-filter]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      items.forEach(function (item) {
        var cat = item.getAttribute('data-category');
        var show = filter === 'all' || cat === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* Season calendar tabs */
  var seasonData = {
    spring: {
      title: 'Salmon, Sturgeon, Walleye',
      items: [
        'Peak Spring Chinook (Springer) Season — March to Early June',
        'Excellent time for Sturgeon Catch & Release',
        'Fantastic Walleye Fishing Begins'
      ]
    },
    summer: {
      title: 'Salmon, Sturgeon, Walleye, Steelhead',
      items: [
        'Summer Chinook & Sockeye runs peak June through August',
        'Sturgeon fishing remains strong on the Columbia',
        'Walleye action heats up — great for families'
      ]
    },
    fall: {
      title: 'Fall Chinook, Coho, Sturgeon',
      items: [
        'Fall Chinook season — September through November',
        'Coho salmon runs in the Gorge and below',
        'Sturgeon catch-and-release year-round opportunities'
      ]
    },
    winter: {
      title: 'Steelhead, Sturgeon, Walleye',
      items: [
        'Winter steelhead fishing on tributaries',
        'Sturgeon fishing continues through winter months',
        'Walleye bite stays active in deeper holes'
      ]
    }
  };

  var seasonPanel = document.getElementById('season-detail');
  if (seasonPanel) {
    function setSeason(key) {
      var data = seasonData[key];
      if (!data) return;
      document.querySelectorAll('[data-season]').forEach(function (el) {
        var match = el.getAttribute('data-season') === key;
        el.classList.toggle('is-active', match);
      });
      document.querySelectorAll('.season-tab[data-season]').forEach(function (tab) {
        tab.classList.toggle('is-active', tab.getAttribute('data-season') === key);
      });
      seasonPanel.querySelector('[data-season-title]').textContent = data.title;
      var list = seasonPanel.querySelector('[data-season-list]');
      list.innerHTML = data.items.map(function (item) {
        return '<li>' + item + '</li>';
      }).join('');
    }
    document.querySelectorAll('[data-season]').forEach(function (el) {
      el.addEventListener('click', function () {
        setSeason(el.getAttribute('data-season'));
      });
    });
    setSeason('spring');
  }

  /* Availability calendar month nav */
  var calWidget = document.getElementById('avail-calendar');
  if (calWidget) {
    var monthLabel = calWidget.querySelector('[data-cal-month]');
    var grid = calWidget.querySelector('[data-cal-grid]');
    var monthOffset = 0;

    function renderCalendar() {
      var now = new Date();
      var view = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
      var year = view.getFullYear();
      var month = view.getMonth();
      var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      monthLabel.textContent = monthNames[month] + ' ' + year;

      var firstDay = new Date(year, month, 1).getDay();
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var html = '';
      var dow = ['S','M','T','W','T','F','S'];
      dow.forEach(function (d) { html += '<span class="dow">' + d + '</span>'; });

      for (var i = 0; i < firstDay; i++) html += '<span class="day is-empty"></span>';

      for (var day = 1; day <= daysInMonth; day++) {
        var cls = 'day';
        var mod = (day + month) % 7;
        if (mod === 0 || mod === 5) cls += ' is-peak';
        else if (mod === 1 || mod === 3) cls += ' is-booked';
        else cls += ' is-available';
        html += '<span class="' + cls + '">' + day + '</span>';
      }
      grid.innerHTML = html;
    }

    calWidget.querySelector('[data-cal-prev]')?.addEventListener('click', function () {
      monthOffset--;
      renderCalendar();
    });
    calWidget.querySelector('[data-cal-next]')?.addEventListener('click', function () {
      monthOffset++;
      renderCalendar();
    });
    renderCalendar();
  }

  /* Map location tabs */
  var locationData = {
    hood: {
      title: 'Hood River / The Dalles',
      region: 'WA / OR',
      address: 'Boat Ramp Rd, Hood River, OR 97031',
      species: 'Salmon, Steelhead, Sturgeon, Walleye',
      desc: 'A popular launch in the Columbia River Gorge with easy access to prime salmon and sturgeon waters. Ideal for spring chinook and fall salmon runs.',
      directions: [
        'Take I-84 East toward The Dalles',
        'Exit at Hood River (Exit 63)',
        'Turn right onto OR-35 / Front Street',
        'Follow signs to the boat ramp',
        'Meet your guide at the launch — look for our heated boat'
      ],
      map: 'https://maps.google.com/maps?q=Boat+Ramp+Rd+Hood+River+OR&output=embed',
      link: 'https://maps.google.com/?q=Boat+Ramp+Rd+Hood+River+OR'
    },
    stevenson: {
      title: 'Stevenson / Bingen',
      region: 'WA',
      address: 'Rock Creek Dr, Stevenson, WA 98648',
      species: 'Sturgeon, Salmon, Walleye, Steelhead',
      desc: 'Excellent sturgeon fishing near the Bridge of the Gods. Calm water and deep holes make this a favorite for trophy sturgeon trips year-round.',
      directions: [
        'Take I-84 East or WA-14 along the Gorge',
        'Exit at Stevenson (WA-14)',
        'Follow signs to the boat launch on Rock Creek Dr',
        'Park in the public lot near the ramp',
        'Your guide will meet you dockside'
      ],
      map: 'https://maps.google.com/maps?q=Stevenson+WA+boat+launch&output=embed',
      link: 'https://maps.google.com/?q=Stevenson+WA+boat+launch'
    },
    dalles: {
      title: 'The Dalles / Rufus',
      region: 'OR',
      address: 'Marine Dr, The Dalles, OR 97058',
      species: 'Walleye, Sturgeon, Salmon, Bass',
      desc: 'Wide river sections and consistent walleye action. Great for family trips and multi-species fishing throughout the season.',
      directions: [
        'Take I-84 East to The Dalles',
        'Exit at West 6th Street (Exit 82)',
        'Head north toward the Columbia River',
        'Turn onto Marine Drive to the boat ramp',
        'Look for our guided boat at the dock'
      ],
      map: 'https://maps.google.com/maps?q=The+Dalles+OR+boat+ramp&output=embed',
      link: 'https://maps.google.com/?q=The+Dalles+OR+boat+ramp'
    }
  };

  var mapPanel = document.getElementById('map-detail-panel');
  if (mapPanel) {
    function setLocation(key) {
      var loc = locationData[key];
      if (!loc) return;
      document.querySelectorAll('[data-location]').forEach(function (el) {
        el.classList.toggle('is-active', el.getAttribute('data-location') === key);
      });
      mapPanel.querySelector('[data-loc-title]').textContent = loc.title;
      mapPanel.querySelector('[data-loc-region]').textContent = loc.region;
      mapPanel.querySelector('[data-loc-address]').textContent = loc.address;
      mapPanel.querySelector('[data-loc-species]').textContent = loc.species;
      mapPanel.querySelector('[data-loc-desc]').textContent = loc.desc;
      var list = mapPanel.querySelector('[data-loc-directions]');
      list.innerHTML = loc.directions.map(function (d) { return '<li>' + d + '</li>'; }).join('');
      var iframe = document.querySelector('[data-map-iframe]');
      var link = mapPanel.querySelector('[data-loc-link]');
      if (iframe) iframe.src = loc.map;
      if (link) link.href = loc.link;
    }
    document.querySelectorAll('[data-location]').forEach(function (el) {
      el.addEventListener('click', function () { setLocation(el.getAttribute('data-location')); });
    });
    setLocation('hood');
  }

  /* Simple form handlers */
  document.querySelectorAll('[data-page-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('[data-form-msg]');
      if (msg) {
        msg.hidden = false;
        msg.textContent = 'Thank you! We will get back to you shortly.';
      }
      form.reset();
    });
  });
})();
