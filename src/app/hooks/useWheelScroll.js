// hooks/useWheelScroll.js
import { useEffect, useRef, useState } from 'react';

export const useWheelScroll = (options = {}) => {
    const {
        scrollSpeed = 50, // Her wheel hareketiyle kaydırılacak piksel miktarı
        smoothScroll = true, // Smooth scroll aktif/pasif
        preventDefault = true, // Varsayılan scroll davranışını engelle
    } = options;

    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            if (preventDefault) {
                e.preventDefault();
            }

            const delta = e.deltaY;
            const currentScroll = container.scrollTop;
            const maxScroll = container.scrollHeight - container.clientHeight;

            // Yeni scroll pozisyonu
            let newScrollPosition = currentScroll + (delta > 0 ? scrollSpeed : -scrollSpeed);
            newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));

            // Scroll uygula
            if (smoothScroll) {
                container.scrollTo({
                    top: newScrollPosition,
                    behavior: 'smooth'
                });
            } else {
                container.scrollTop = newScrollPosition;
            }

            // State güncelle
            setScrollPosition(newScrollPosition);
            setScrollPercentage(maxScroll > 0 ? (newScrollPosition / maxScroll) * 100 : 0);
        };

        const handleScroll = () => {
            const currentScroll = container.scrollTop;
            const maxScroll = container.scrollHeight - container.clientHeight;

            setScrollPosition(currentScroll);
            setScrollPercentage(maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0);
        };

        // Event listeners
        container.addEventListener('wheel', handleWheel, { passive: !preventDefault });
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('scroll', handleScroll);
        };
    }, [scrollSpeed, smoothScroll, preventDefault]);

    return {
        containerRef,
        scrollPosition,
        scrollPercentage,
    };
};

// CSS için yardımcı fonksiyon
export const hideScrollbar = {
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
    '&::-webkit-scrollbar': {
        display: 'none', // Webkit browsers
    },
};


// CSS-in-JS kullanıyorsanız (styled-components vb.)
// export const ScrollContainer = styled.div`
//   ${hideScrollbar}
//   height: 400px;
//   overflow-y: auto;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// Tailwind CSS kullanıyorsanız globals.css'e ekleyin:
/*
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
*/