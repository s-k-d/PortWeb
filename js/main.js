document.addEventListener('DOMContentLoaded', () => {
    // Essential DOM Elements
    const navbar = document.querySelector(".navbar");
    const filterButtons = document.querySelectorAll(".portfolio-filter button");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const sections = document.querySelectorAll("section[id]");
    const contactSocial = document.querySelector(".contact-social .header-social");

    /*===== Sticky Navbar =====*/
    const handleStickyNavbar = () => {
        if (navbar) {
            navbar.classList.toggle("sticky", window.scrollY > 20);
        }
    };
    window.addEventListener("scroll", handleStickyNavbar);

    /*===== Active Section Highlighting =====*/
    const highlightActiveSection = () => {
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 50;
            const sectionId = section.getAttribute("id");
            const sectionLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (sectionLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionLink.classList.add("active");
                } else {
                    sectionLink.classList.remove("active");
                }
            }
        });
    };
    window.addEventListener("scroll", highlightActiveSection);

    /*===== Portfolio Filtering System =====*/
    const initializePortfolioFilter = () => {
        const showItem = (item) => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        };

        const hideItem = (item) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        };

        const filterItems = (filterValue) => {
            portfolioItems.forEach((item) => {
                const itemCategory = item.getAttribute('data-category');
                filterValue === 'all' || itemCategory === filterValue
                    ? showItem(item)
                    : hideItem(item);
            });
        };

        const initializeFilterButtons = () => {
            filterButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    filterButtons.forEach((btn) => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filterValue = button.getAttribute('data-filter');
                    filterItems(filterValue);
                });
            });
        };

        initializeFilterButtons();
        filterItems('all'); // Show all items by default
    };
    initializePortfolioFilter();

    /*===== Smooth Scroll Implementation =====*/
    const initializeSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth',
                        });
                    }
                }
            });
        });
    };
    initializeSmoothScroll();

    /*===== Portfolio Item Hover Effects =====*/
    const initializePortfolioHoverEffects = () => {
        portfolioItems.forEach((item) => {
            const overlay = item.querySelector('.item-overlay');
            const title = overlay ? overlay.querySelector('h4') : null;

            item.addEventListener('mouseenter', () => {
                if (overlay) overlay.style.opacity = '1';
                if (title) title.style.transform = 'translateY(0)';
            });

            item.addEventListener('mouseleave', () => {
                if (overlay) overlay.style.opacity = '0';
                if (title) title.style.transform = 'translateY(20px)';
            });
        });
    };
    initializePortfolioHoverEffects();

    /*===== Social Media Icons in Contact Section =====*/
    const initializeContactSocialMedia = () => {
        if (contactSocial) {
            const socialMediaLinks = [
                { platform: "GitHub", icon: "fab fa-github", url: "https://github.com/s-k-d" },
                { platform: "Quora", icon: "fab fa-quora", url: "https://www.quora.com/profile/SKD-86" },
                { platform: "Twitter", icon: "fab fa-twitter", url: "https://x.com/SKD_real" },
                { platform: "LinkedIn", icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/shivanshdogra/" },
            ];

            socialMediaLinks.forEach(({ icon, url }) => {
                const listItem = document.createElement("li");
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.target = "_blank";
                anchor.innerHTML = `<i class="${icon}"></i>`;
                listItem.appendChild(anchor);
                contactSocial.appendChild(listItem);
            });
        }
    };
    initializeContactSocialMedia();
});
