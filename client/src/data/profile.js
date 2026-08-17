const profile = {
    id: "user-1",

    name: "Om Shete",

    username: "@omshete",

    avatar: "https://i.pravatar.cc/300?img=12",

    bio:
        "Tech enthusiast who loves discovering useful products and trading things I no longer need.",

    location: "Pune, Maharashtra",

    memberSince: "August 2026",

    isVerified: true,

    stats: {
        products: 8,
        swaps: 12,
        wishlist: 6,
    },

    products: [
        {
            id: 1,
            title: "Sony WH-1000XM5",
            category: "Electronics",
            condition: "Like New",
            location: "Pune",
            desiredProduct: "Gaming Keyboard",
            description:
                "Premium noise cancelling headphones in excellent condition.",
            image:
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
            owner: {
                name: "Om Shete",
                avatar:
                    "https://i.pravatar.cc/300?img=12",
            },
        },

        {
            id: 2,
            title: "Mechanical Keyboard",
            category: "Electronics",
            condition: "Like New",
            location: "Pune",
            desiredProduct: "Headphones",
            description:
                "RGB mechanical keyboard with blue switches.",
            image:
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
            owner: {
                name: "Om Shete",
                avatar:
                    "https://i.pravatar.cc/300?img=12",
            },
        },

        {
            id: 3,
            title: "JavaScript Programming Book",
            category: "Books",
            condition: "Good",
            location: "Pune",
            desiredProduct: "React Book",
            description:
                "JavaScript programming book for developers.",
            image:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
            owner: {
                name: "Om Shete",
                avatar:
                    "https://i.pravatar.cc/300?img=12",
            },
        },

        {
            id: 4,
            title: "Acoustic Guitar",
            category: "Music",
            condition: "Good",
            location: "Pune",
            desiredProduct: "Digital Piano",
            description:
                "Well maintained acoustic guitar.",
            image:
                "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800",
            owner: {
                name: "Om Shete",
                avatar:
                    "https://i.pravatar.cc/300?img=12",
            },
        },
    ],

    wishlist: [
        {
            id: 10,
            title: "MacBook Air M1",
            category: "Electronics",
            condition: "Good",
            location: "Mumbai",
            desiredProduct: "iPad or Tablet",
            description:
                "MacBook Air M1 with great battery health.",
            image:
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
            owner: {
                name: "Priya Patil",
                avatar:
                    "https://i.pravatar.cc/100?img=32",
            },
        },

        {
            id: 11,
            title: "Mountain Bike",
            category: "Sports",
            condition: "Good",
            location: "Pune",
            desiredProduct: "Smart Watch",
            description:
                "Mountain bike for city rides.",
            image:
                "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800",
            owner: {
                name: "Amit Kulkarni",
                avatar:
                    "https://i.pravatar.cc/100?img=11",
            },
        },
    ],

    swapActivity: [
        {
            id: 1,
            product: "Sony WH-1000XM5",
            user: "Rahul Sharma",
            status: "Completed",
            date: "Aug 12, 2026",
        },

        {
            id: 2,
            product: "Mechanical Keyboard",
            user: "Rohan Singh",
            status: "Pending",
            date: "Aug 15, 2026",
        },

        {
            id: 3,
            product: "Acoustic Guitar",
            user: "Siddharth Rao",
            status: "Completed",
            date: "Aug 08, 2026",
        },
    ],
};

export default profile;