/* ============================================
   SABILOADED TV - JavaScript
   Theme Toggle, Mobile Menu, Interactions
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. DARK / LIGHT THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('sabiloaded-theme');
    
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Switch to Light
            htmlElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('sabiloaded-theme', 'light');
        } else {
            // Switch to Dark
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('sabiloaded-theme', 'dark');
        }
    });
    
    
    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    
    // ==========================================
    // 3. NEWSLETTER SUBSCRIPTION
    // ==========================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // In a real implementation, you'd send this to a server
                // For now, show a success message
                showToast('✅ Thank you! You\'ve been subscribed to our newsletter.', 'success');
                emailInput.value = '';
                
                // Save to localStorage as a simple subscriber list (demo)
                saveSubscriber(email);
            } else {
                showToast('❌ Please enter a valid email address.', 'error');
            }
        });
    }
    
    
    // ==========================================
    // 4. ACTIVITY FEED SIMULATION
    // ==========================================
    const activityFeed = document.querySelector('.activity-feed');
    
    if (activityFeed) {
        // Simulated activities (in a real site, these would come from a server)
        const activities = [
            '🛡️ <strong>Chidi_O</strong> earned the <em>Truth Seeker</em> badge',
            '📝 <strong>Anonymous</strong> submitted a new citizen report',
            '💬 <strong>Adaora</strong> commented on "Senate Passes Bill..."',
            '🔥 <strong>8 users</strong> are reading the featured investigation',
            '⭐ <strong>Emeka</strong> shared "Landmark Ruling..." to Facebook',
            '🏆 <strong>JusticeFront</strong> reached <em>Activist</em> rank',
            '📰 <strong>Breaking:</strong> New report published by editorial team',
            '💬 <strong>Ibrahim</strong> replied to a comment on "Oil Spills..."',
            '🛡️ <strong>Ngozi</strong> earned the <em>Amplifier</em> badge',
            '🔥 <strong>12 users</strong> are viewing trending stories'
        ];
        
        let activityIndex = 0;
        
        // Add new activity every 8 seconds
        setInterval(function() {
            const newActivity = activities[activityIndex % activities.length];
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = newActivity;
            activityItem.style.opacity = '0';
            activityItem.style.transform = 'translateY(-10px)';
            activityItem.style.transition = 'all 0.5s ease';
            
            // Insert at top
            activityFeed.insertBefore(activityItem, activityFeed.firstChild);
            
            // Trigger animation
            setTimeout(function() {
                activityItem.style.opacity = '1';
                activityItem.style.transform = 'translateY(0)';
            }, 50);
            
            // Remove oldest if more than 8 items
            const items = activityFeed.querySelectorAll('.activity-item');
            if (items.length > 8) {
                items[items.length - 1].remove();
            }
            
            activityIndex++;
        }, 8000);
    }
    
    
    // ==========================================
    // 5. VIEW COUNT SIMULATION
    // ==========================================
    // Simulate growing view counts (demo only)
    const viewElements = document.querySelectorAll('.trending-views');
    
    if (viewElements.length > 0) {
        setInterval(function() {
            viewElements.forEach(el => {
                const currentText = el.textContent;
                const match = currentText.match(/([\d.]+)(k?) views/);
                if (match) {
                    let num = parseFloat(match[1]);
                    const suffix = match[2] || '';
                    num += Math.random() * 0.2;
                    el.textContent = num.toFixed(1) + suffix + ' views';
                }
            });
        }, 15000);
    }
    
    
    // ==========================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    // ==========================================
    // 7. INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    // Fade in elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe news cards
    document.querySelectorAll('.news-card, .spotlight-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    
    // ==========================================
    // 8. "SUBMIT TIP" BUTTON DEMO
    // ==========================================
    const submitTipButtons = document.querySelectorAll('.btn-outline');
    submitTipButtons.forEach(btn => {
        if (btn.textContent.includes('Submit Tip')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('📋 Tip submission form coming soon. For urgent tips, email tips@sabiloadedtv.com', 'info');
            });
        }
    });
    
    
    // ==========================================
    // 9. "JOIN US" BUTTON DEMO
    // ==========================================
    const joinButtons = document.querySelectorAll('.btn-primary');
    joinButtons.forEach(btn => {
        if (btn.textContent.includes('Join Us') || btn.textContent.includes('Join')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('🔐 Registration coming soon! Early access will be announced on our social media.', 'info');
            });
        }
    });
    
    
});


// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Validates email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Saves subscriber to localStorage (demo)
 */
function saveSubscriber(email) {
    let subscribers = JSON.parse(localStorage.getItem('sabiloaded-subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('sabiloaded-subscribers', JSON.stringify(subscribers));
    }
}

/**
 * Shows a toast notification
 */
function showToast(message, type) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    // Style based on type
    const bgColors = {
        success: '#2ed573',
        error: '#e94560',
        info: '#1e90ff'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: ${bgColors[type] || bgColors.info};
        color: #ffffff;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: slideIn 0.4s ease, slideOut 0.4s ease 3.5s forwards;
        max-width: 400px;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 4 seconds
    setTimeout(function() {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
}

// Add toast animations dynamically
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

// ==========================================
// SERVICE WORKER REGISTRATION (for PWA)
// ==========================================
// Uncomment the following to enable PWA functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}
*/
