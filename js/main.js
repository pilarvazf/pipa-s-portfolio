// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Submits the contact form to Formspree via AJAX so the visitor stays on
  // the page and sees an inline confirmation instead of being redirected.
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.querySelector('#form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      var data = new FormData(form);

      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (note) {
            note.textContent = 'Thanks — your message has been sent!';
            note.style.display = 'block';
          }
        } else {
          return response.json().then(function (result) {
            var message = (result && result.errors)
              ? result.errors.map(function (err) { return err.message; }).join(', ')
              : 'Something went wrong sending your message. Please try again or email directly.';
            throw new Error(message);
          });
        }
      }).catch(function (err) {
        if (note) {
          note.textContent = err && err.message
            ? err.message
            : 'Something went wrong sending your message. Please try again or email directly.';
          note.style.display = 'block';
        }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  // ---- Playlist audio player ----
  // Works on any page that has a [data-playlist] container of .track rows.
  // Only one track plays at a time; clicking a playing track's button pauses it;
  // clicking a different track stops the current one and starts the new one.
  var playlist = document.querySelector('[data-playlist]');
  if (playlist) {
    var tracks = Array.prototype.slice.call(playlist.querySelectorAll('.track'));
    var audio = new Audio();
    var activeTrack = null;

    function formatTime(seconds) {
      if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
      var m = Math.floor(seconds / 60);
      var s = Math.floor(seconds % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function setTrackTime(track, seconds) {
      var timeEl = track.querySelector('[data-time]');
      if (timeEl) timeEl.textContent = formatTime(seconds);
    }

    function stopActiveTrack() {
      if (activeTrack) {
        activeTrack.classList.remove('is-playing');
        var fill = activeTrack.querySelector('.track-progress-fill');
        if (fill) fill.style.width = '0%';
      }
      activeTrack = null;
    }

    tracks.forEach(function (track) {
      var playBtn = track.querySelector('.track-play');
      var progressBar = track.querySelector('.track-progress-bar');
      var fill = track.querySelector('.track-progress-fill');
      var src = track.getAttribute('data-src');

      // Load metadata up front just to show a real duration in the time field.
      var probe = new Audio();
      probe.preload = 'metadata';
      probe.src = src;
      probe.addEventListener('loadedmetadata', function () {
        track._duration = probe.duration;
        setTrackTime(track, probe.duration);
      });

      playBtn.addEventListener('click', function () {
        var isThisPlaying = track === activeTrack && !audio.paused;

        if (isThisPlaying) {
          audio.pause();
          track.classList.remove('is-playing');
          return;
        }

        if (activeTrack && activeTrack !== track) {
          stopActiveTrack();
        }

        if (track === activeTrack) {
          // Same track, was paused — resume.
          audio.play();
          track.classList.add('is-playing');
          return;
        }

        activeTrack = track;
        audio.src = src;
        audio.currentTime = 0;
        audio.play();
        track.classList.add('is-playing');
      });

      progressBar.addEventListener('click', function (e) {
        if (track !== activeTrack || !track._duration) return;
        var rect = progressBar.getBoundingClientRect();
        var ratio = (e.clientX - rect.left) / rect.width;
        audio.currentTime = ratio * track._duration;
      });
    });

    audio.addEventListener('timeupdate', function () {
      if (!activeTrack) return;
      var duration = audio.duration || activeTrack._duration || 0;
      var fill = activeTrack.querySelector('.track-progress-fill');
      if (fill && duration) {
        fill.style.width = ((audio.currentTime / duration) * 100) + '%';
      }
    });

    audio.addEventListener('ended', function () {
      stopActiveTrack();
    });
  }
});
