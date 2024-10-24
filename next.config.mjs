/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
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
