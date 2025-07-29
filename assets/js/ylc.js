// Array of song lyrics with artist and title
const songLyrics = [
  {
    artist: "Joy Division",
    title: "Love Will Tear Us Apart",
    lyrics: `When routine bites hard and ambitions are low
And resentment rides high, but emotions won't grow
And we're changing our ways, taking different roads
Then love, love will tear us apart again
Love, love will tear us apart again`
  },
  {
    artist: "The Stone Roses",
    title: "I Wanna Be Adored",
    lyrics: `I don't have to sell my soul
He's already in me
I wanna be adored
I wanna be adored`
  },
  {
    artist: "The Sisters of Mercy",
    title: "Lucretia My Reflection",
    lyrics: `And does your heart still rule
A sleeping army
Are we still the same
I heard it in the restless wind last night
I heard it in the rain and thunder`
  },
  {
    artist: "Echo & the Bunnymen",
    title: "The Killing Moon",
    lyrics: `Under blue moon I saw you
So soon you'll take me
Up in your arms, too late to beg you
Or cancel it, though I know it must be
The killing time, unwillingly mine`
  }
];

// Function to get a random song from the array
function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * songLyrics.length);
  return songLyrics[randomIndex];
}

// Function to display a random song in the footer
function displayRandomLyrics() {
  const lyricsDisplay = document.getElementById('lyricsDisplay');
  const lyricsCredit = document.getElementById('lyricsCredit');
  
  if (lyricsDisplay && lyricsCredit) {
    const song = getRandomSong();
    lyricsDisplay.textContent = song.lyrics;
    lyricsCredit.textContent = `${song.title} • ${song.artist}`;
  }
}

// Lightbox functionality - moved to global scope
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = imageSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function initializeGalleryLightbox() {
  // Close lightbox when clicking the overlay
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function(event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav-container');
  const mobileClose = document.querySelector('.mobile-close-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-container .header-nav a');
  
  // Toggle mobile menu
  function toggleMenu() {
    if (mobileNav) {
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      
      // Toggle hamburger icon
      if (hamburger) {
        hamburger.classList.toggle('active');
      }
    }
  }
  
  // Close mobile menu
  function closeMenu() {
    if (mobileNav) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  }
  
  // Event listeners
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
    });
  }
  
  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileNav.classList.contains('active') && 
        !e.target.closest('.mobile-nav-container') && 
        !e.target.closest('.hamburger')) {
      closeMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });
  
  // Close menu on resize to desktop
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    }, 100);
  });
  
  // Add resize event listener
  // window.addEventListener('resize', handleResize);

  // Initialize random lyrics display
  displayRandomLyrics();
  
  // Initialize gallery lightbox
  initializeGalleryLightbox();

  // Change lyrics every 10 seconds (optional)
  setInterval(displayRandomLyrics, 10000);
});
