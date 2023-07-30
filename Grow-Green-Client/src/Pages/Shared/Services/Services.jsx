import Service from './Service';

const Services = () => {

    const servicesData = [
        {
            title: 'Garden Design',
            description: 'Our expert team will help you design the perfect rooftop garden for your space.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            ),
        },
        {
            title: 'Plant Installation',
            description: 'Let our skilled team install a wide variety of plants and flowers in your rooftop garden.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            ),
        },
        {
            title: 'Irrigation System',
            description: 'We\'ll set up a smart irrigation system to keep your rooftop garden lush and healthy.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 4v7m0 0v4m0-4h-4m4 0l-9 9-4-4-6 6"
                />
            ),
        },
        {
            title: 'Greenhouse Installation',
            description: 'Get a custom-built greenhouse for year-round gardening and protection for your plants.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            ),
        },
        {
            title: 'Roof Repairs',
            description: 'If your rooftop needs repairs, we offer expert services to ensure a safe and stable garden.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 2.828a4 4 0 015.656 0l1.414 1.414a4 4 0 010 5.656L15.657 15.9l-7.071-7.071L14.828 2.828zm-9.9 9.9L2.828 14.828a4 4 0 010-5.656L8.1 5.657l7.071 7.071-1.414 1.414L6.929 12.728zm1.415 1.414l7.071 7.071-1.414 1.414-7.071-7.071 1.414-1.414z"
                />
            ),
        },
        {
            title: 'Landscaping',
            description: 'Transform your rooftop into a beautiful landscape with our professional landscaping services.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20l4-8-4-8M7 4l-4 8 4 8"
                />
            ),
        },
        {
            title: 'Outdoor Furniture',
            description: 'Discover a wide range of outdoor furniture options to enhance your rooftop garden.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v12M5 15h14M12 3v4m0 0V3m0 4h4m-4 0H8"
                />
            ),
        },
        {
            title: 'Lighting Solutions',
            description: 'We offer creative and efficient lighting solutions to illuminate your rooftop garden.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            ),
        },
        {
            title: 'Rooftop Maintenance',
            description: 'Ensure your rooftop garden stays in top condition with our maintenance services.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 4v7m0 0v4m0-4h-4m4 0l-9 9-4-4-6 6"
                />
            ),
        },
        {
            title: 'Garden Maintenance',
            description: 'Let our team take care of all the maintenance tasks to keep your rooftop garden thriving.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            ),
        },
        {
            title: 'Composting',
            description: 'Learn about composting and how to create nutrient-rich compost for your rooftop garden.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            ),
        },
        {
            title: 'Lawn Care',
            description: 'Maintain a beautiful and healthy lawn with our expert lawn care services.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            ),
        },
        {
            title: 'Pest Control',
            description: 'Keep your rooftop garden free from pests with our effective pest control solutions.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 4v7m0 0v4m0-4h-4m4 0l-9 9-4-4-6 6"
                />
            ),
        },
        {
            title: 'Vertical Gardening',
            description: 'Create a beautiful and space-saving vertical garden on your rooftop with our expertise.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 20V10M12 20V4m6 0a6 6 0 00-6 6v4a6 6 0 006 6zM6 20V10M10 20V4m0 0l-4 4m4-4l4 4m0 4l4 4m-4-4l-4 4"
                />
            ),
        },
        {
            title: 'Fruit Trees',
            description: 'Add fruit trees to your rooftop garden and enjoy fresh fruits right at your home.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 14l3-3 3 3 5-5M4 7l5 5 5-5M6 14l9-9"
                />
            ),
        },
        {
            title: 'Herb Garden',
            description: 'Grow a variety of herbs in your rooftop garden for fresh flavors in your cooking.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6s1 3.5 4 3.5 4-3.5 4-3.5M12 6s-1 3.5-4 3.5-4-3.5-4-3.5M12 6s1 5 4 5 4-5 4-5M12 6s-1 5-4 5-4-5-4-5M20 9v2a6 6 0 01-6 6H8a6 6 0 01-6-6V9m12 0a2 2 0 012 2v2m-4-2a2 2 0 012 2v2m-4-2a2 2 0 012 2v2"
                />
            ),
        },
        {
            title: 'Rooftop Oasis',
            description: 'Create a serene rooftop oasis with comfortable seating and relaxing ambiance.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a4 4 0 014-4h10a4 4 0 014 4v12a4 4 0 01-4 4H7zm0 0l4-4m4 4l4-4m-4 4V7m4 10V7"
                />
            ),
        },
        {
            title: 'Sustainable Practices',
            description: 'Learn about sustainable gardening practices to reduce environmental impact.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3h6m-6 4h6m-6 4h6m-6 4h6M3 4v16M21 4v16M6 4v16m2-3h8m-4 3v4m0 0V7m0 4h4M6 8h4m0 0v4m0-4V7m0 0h4m10 10V7m0 0h-2m0 0V7m0 0h-2m0 0V7m0 0h-2m0 0V7m0 0h-2m0 0V7m0 0h-2m-3 3h2m0 0v2m0-2v2m0 0h2m0 0v2m0-2v2m0 0h2m0 0v2m0-2v2m0 0h2m0 0v2m0-2v2"
                />
            ),
        },
        {
            title: 'Garden Maintenance',
            description: 'Let our experts take care of your rooftop garden with regular maintenance and care.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a4 4 0 014-4h10a4 4 0 014 4v12a4 4 0 01-4 4H7zm0 0l4-4m4 4l4-4m-4 4V7m4 10V7"
                />
            ),
        },
        {
            title: 'Organic Farming',
            description: 'Discover the benefits of organic farming and grow fresh produce naturally.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3h6m-6 4h6m-6 4h6m-6 4h6M3 4v16M21 4v16M6 4v16m2-3h8m-4 3v4m0 0V7m0 4h4M6 8h4m0 0v4m0-4V7m0 0h4m10 10V7m0 0h-2m0 0V7m0 0h-2m0 0V7m0 0h-2m0 0V7m0 0h-2m-3 3h2m0 0v2m0-2v2m0 0h2m0 0v2m0-2v2m0 0h2m0 0v2m0-2v2m0 0h2m0 0v2m0-2v2"
                />
            ),
        },
        {
            title: 'Roof Insulation',
            description: 'Improve energy efficiency by adding roof insulation for a cooler rooftop space.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 14l3-3 3 3 5-5M4 7l5 5 5-5M6 14l9-9"
                />
            ),
        },
        {
            title: 'Rainwater Harvesting',
            description: 'Collect rainwater to water your garden and contribute to water conservation.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 9v2a6 6 0 01-6 6H8a6 6 0 01-6-6V9m12 0a2 2 0 012 2v2m-4-2a2 2 0 012 2v2m-4-2a2 2 0 012 2v2"
                />
            ),
        },
        {
            title: 'Greenhouse Construction',
            description: 'Build a functional and efficient greenhouse to extend your growing season.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 2v9c0 1.1.9 2 2 2h1m4 0h6m2 0h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1M7 15h4m5 0h1m1 0h4m5 0h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1m-4 13v3M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2m-2 0h-4m0 0V6m0 0h4"
                />
            ),
        },
        {
            title: 'Green Roof Design',
            description: 'Let our experts design and create a beautiful and sustainable green roof for your property.',
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20h10M7 12h2m4 0h2m-2-4h2m-6 0h2m4 0h2m0 4h2M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
            ),
        },
    ];



    return (
        <div className='pt-32'>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {servicesData.map((service, index) => (
                    <Service
                        key={index}
                        title={service.title}
                        description={service.description}
                        icon={service.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;
