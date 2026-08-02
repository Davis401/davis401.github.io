<script>
	let { data } = $props();

	let openIndex = $state(null);
	let isOpen = $derived(openIndex !== null);

	function open(index) {
		openIndex = index;
	}

	function close() {
		openIndex = null;
	}

	function next(event) {
		event?.stopPropagation();
		if (openIndex !== null) {
			openIndex = (openIndex + 1) % data.photos.length;
		}
	}

	function prev(event) {
		event?.stopPropagation();
		if (openIndex !== null) {
			openIndex = (openIndex - 1 + data.photos.length) % data.photos.length;
		}
	}

	function onKeydown(event) {
		if (!isOpen) return;
		if (event.key === 'Escape') close();
		else if (event.key === 'ArrowRight') next();
		else if (event.key === 'ArrowLeft') prev();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<title>Davis Johnson — Photos</title>
</svelte:head>

<div class="page">
	<header class="site-header">
		<span class="wordmark">DAVIS JOHNSON</span>

		<nav class="nav" aria-label="Primary">
			<a href="/photos" class="nav-link active">Photos</a>
		</nav>

		<a class="social" href="https://instagram.com/captmagni" target="_blank" rel="noreferrer" aria-label="Instagram">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5">
				<rect x="2.5" y="2.5" width="19" height="19" rx="5" />
				<circle cx="12" cy="12" r="4.4" />
				<circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
			</svg>
		</a>
	</header>

	<main class="wall">
		{#each data.photos as src, i (src)}
			<button type="button" class="tile" onclick={() => open(i)} aria-label="View full-size photo">
				<img {src} alt="" loading="lazy" />
			</button>
		{/each}

	</main>
</div>

{#if isOpen}
	<div class="lightbox" onclick={close} role="dialog" aria-modal="true">
		<button type="button" class="lightbox-close" onclick={close} aria-label="Close">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5">
				<line x1="5" y1="5" x2="19" y2="19" />
				<line x1="19" y1="5" x2="5" y2="19" />
			</svg>
		</button>

		<button type="button" class="lightbox-nav lightbox-prev" onclick={prev} aria-label="Previous photo">
			<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5">
				<polyline points="15 6 9 12 15 18" />
			</svg>
		</button>

		<img
			class="lightbox-image"
			src={data.photos[openIndex]}
			alt=""
			onclick={(e) => e.stopPropagation()}
		/>

		<button type="button" class="lightbox-nav lightbox-next" onclick={next} aria-label="Next photo">
			<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5">
				<polyline points="9 6 15 12 9 18" />
			</svg>
		</button>
	</div>
{/if}

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}

	.page {
		background: #ffffff;
		color: #0a0a0a;
		min-height: 100vh;
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Helvetica Neue',
			Arial,
			sans-serif;
	}

	.site-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 28px 40px;
	}

	.wordmark {
		font-weight: 800;
		font-size: 22px;
		letter-spacing: 0.02em;
		justify-self: start;
	}

	.nav {
		justify-self: center;
	}

	.nav-link {
		color: inherit;
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
		padding-bottom: 4px;
		border-bottom: 2px solid transparent;
	}

	.nav-link.active {
		border-bottom-color: #0a0a0a;
	}

	.social {
		justify-self: end;
		color: #0a0a0a;
		display: inline-flex;
	}

	.wall {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2px;
	}

	.tile {
		margin: 0;
		padding: 0;
		border: none;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: #eee;
		cursor: pointer;
		display: block;
	}

	.tile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.tile:hover img {
		transform: scale(1.03);
	}

	.lightbox {
		position: fixed;
		inset: 0;
		background: rgba(10, 10, 10, 0.92);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: 48px;
		box-sizing: border-box;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}

	.lightbox-close {
		position: fixed;
		top: 24px;
		right: 24px;
	}

	.lightbox-prev {
		left: 16px;
	}

	.lightbox-next {
		right: 16px;
	}

	.lightbox-close,
	.lightbox-nav {
		background: transparent;
		border: none;
		color: #ffffff;
		opacity: 0.75;
		cursor: pointer;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s ease;
	}

	.lightbox-nav {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
	}

	.lightbox-close:hover,
	.lightbox-nav:hover {
		opacity: 1;
	}

	@media (max-width: 560px) {
		.lightbox {
			padding: 16px;
		}
		.lightbox-nav {
			display: none;
		}
	}

	.empty {
		grid-column: 1 / -1;
		padding: 80px 20px;
		text-align: center;
		color: #888;
	}

	@media (max-width: 900px) {
		.wall {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.wall {
			grid-template-columns: 1fr;
		}
		.site-header {
			grid-template-columns: 1fr;
			row-gap: 12px;
			text-align: center;
			padding: 20px;
		}
		.wordmark,
		.nav,
		.social {
			justify-self: center;
		}
	}
</style>