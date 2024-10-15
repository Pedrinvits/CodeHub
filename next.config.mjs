/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
			  protocol: 'https',
			  hostname: 'firebasestorage.googleapis.com',
			},
		  ],
	},
	logging: {
		fetches: {
			fullUrl:true
		}
	}
};

export default nextConfig;
