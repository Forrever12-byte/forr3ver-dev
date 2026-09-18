const galleries = {
                savora: [
                    { type: 'image', src: 'images/portfolio/savora-desktop.png' },
                    { type: 'image', src: 'images/portfolio/savora-mobile.png' },
                    { type: 'image', src: 'images/portfolio/savora-order-feature.png' },
                    { type: 'video', src: 'images/portfolio/savora-demo.mp4', thumb: 'images/portfolio/savora-demo-thumb.png' }
                ],
                fithub: [
                    { type: 'image', src: 'images/portfolio/fithub-desktop.png' },
                    { type: 'image', src: 'images/portfolio/fithub-mobile.png' },
                    { type: 'image', src: 'images/portfolio/fithub-grid.jpg' },
                    { type: 'video', src: 'images/portfolio/fithub-demo.mp4', thumb: 'images/portfolio/fithub-demo-thumb.png' }
                ]
            };

            let currentGallery = [];
            let currentIndex = 0;

            function showImage() {
                const item = currentGallery[currentIndex];
                const mediaContainer = document.getElementById('gallery-media');

                mediaContainer.innerHTML = ''; // clear whatever was there before

                if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.src = item.src;
                    video.controls = true;
                    video.autoplay = true;
                    video.muted = true;
                    video.preload = 'metadata';
                    video.className = 'max-w-[80vw] max-h-[65vh] rounded-lg mx-auto my-auto';
                    mediaContainer.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.className = 'max-w-[80vw] max-h-[65vh] rounded-lg mx-auto my-auto';
                    mediaContainer.appendChild(img);
                }

                document.getElementById('gallery-counter').textContent = `${currentIndex + 1} / ${currentGallery.length}`;

                const thumbStrip = document.getElementById('gallery-thumbs');
                thumbStrip.innerHTML = '';

                currentGallery.forEach((thumbItem, i) => {
                    const thumb = document.createElement('img');
                    thumb.src = thumbItem.thumb || thumbItem.src;
                    thumb.className = `w-16 h-16 rounded cursor-pointer border-2 flex items-center justify-center bg-surface ${i === currentIndex ? 'border-primary' : 'border-transparent'}`;

                    if (thumbItem.type === 'video') {
                        thumb.innerHTML = '<i class="fa-solid fa-play text-primary"></i>';
                    } else {
                        thumb.innerHTML = `<img src="${thumbItem.src}" class="w-full h-full object-cover rounded">`;
                    }
                    thumb.addEventListener('click', () => { currentIndex = i; showImage(); });
                    thumbStrip.appendChild(thumb);
                });
            }

            document.querySelectorAll('[data-gallery]').forEach(img => {
                img.addEventListener('click', () => {
                    currentGallery = galleries[img.dataset.gallery];
                    currentIndex = 0;
                    showImage();
                    document.getElementById('gallery-modal').classList.remove('hidden');
                    document.getElementById('gallery-modal').classList.add('flex');
                });
            });

            document.getElementById('gallery-next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                showImage();
            });

            document.getElementById('gallery-prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                showImage();
            });

            document.getElementById('gallery-close').addEventListener('click', () => {
                document.getElementById('gallery-modal').classList.add('hidden');
                document.getElementById('gallery-modal').classList.remove('flex');
            });