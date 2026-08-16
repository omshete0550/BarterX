const products = [
    {
        id: 1,
        title: "Sony WH-1000XM5",
        category: "Electronics",
        condition: "Like New",
        location: "Pune",
        desiredProduct: "Gaming Keyboard",
        description:
            "Premium noise cancelling headphones in excellent condition. Carefully used and maintained. Comes with the original case and charging cable.",

        image:
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",

        images: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1000",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000",
        ],

        owner: {
            id: 101,
            name: "Rahul Sharma",
            avatar: "https://i.pravatar.cc/100?img=12",
        },

        // Used by ProductDetail
        seller: {
            id: 101,
            name: "Rahul Sharma",
            avatar: "https://i.pravatar.cc/100?img=12",
        },
    },

    {
        id: 2,
        title: "MacBook Air M1",
        category: "Electronics",
        condition: "Good",
        location: "Mumbai",
        desiredProduct: "iPad or Tablet",
        description:
            "MacBook Air M1 with great battery health and no major scratches. Perfect for students, developers, and everyday productivity.",

        image:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",

        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1000",
        ],

        owner: {
            id: 102,
            name: "Priya Patil",
            avatar: "https://i.pravatar.cc/100?img=32",
        },

        seller: {
            id: 102,
            name: "Priya Patil",
            avatar: "https://i.pravatar.cc/100?img=32",
        },
    },

    {
        id: 3,
        title: "Mountain Bike",
        category: "Sports",
        condition: "Good",
        location: "Pune",
        desiredProduct: "Smart Watch",
        description:
            "Mountain bike suitable for city rides and weekend adventures. Well maintained and ready to ride.",

        image:
            "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800",

        images: [
            "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1000",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1000",
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1000",
        ],

        owner: {
            id: 103,
            name: "Amit Kulkarni",
            avatar: "https://i.pravatar.cc/100?img=11",
        },

        seller: {
            id: 103,
            name: "Amit Kulkarni",
            avatar: "https://i.pravatar.cc/100?img=11",
        },
    },

    {
        id: 4,
        title: "Canon DSLR Camera",
        category: "Electronics",
        condition: "Like New",
        location: "Bangalore",
        desiredProduct: "Gaming Console",
        description:
            "Canon DSLR camera with lens and original accessories. Lightly used and kept in excellent condition.",

        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",

        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1000",
            "https://images.unsplash.com/photo-1606986628253-2f3e2b8a8c9e?w=1000",
        ],

        owner: {
            id: 104,
            name: "Neha Joshi",
            avatar: "https://i.pravatar.cc/100?img=47",
        },

        seller: {
            id: 104,
            name: "Neha Joshi",
            avatar: "https://i.pravatar.cc/100?img=47",
        },
    },

    {
        id: 5,
        title: "Study Table",
        category: "Furniture",
        condition: "Good",
        location: "Nashik",
        desiredProduct: "Office Chair",
        description:
            "Minimal wooden study table perfect for a home office or student setup. Strong, clean, and well maintained.",

        image:
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6b5?w=800",

        images: [
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6b5?w=1000",
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1000",
            "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000",
        ],

        owner: {
            id: 105,
            name: "Karan Mehta",
            avatar: "https://i.pravatar.cc/100?img=14",
        },

        seller: {
            id: 105,
            name: "Karan Mehta",
            avatar: "https://i.pravatar.cc/100?img=14",
        },
    },

    {
        id: 6,
        title: "JavaScript Programming Book",
        category: "Books",
        condition: "Good",
        location: "Pune",
        desiredProduct: "React Book",
        description:
            "JavaScript programming book suitable for beginners and intermediate developers. Pages are clean with minimal markings.",

        image:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",

        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1000",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000",
        ],

        owner: {
            id: 106,
            name: "Akshay Deshmukh",
            avatar: "https://i.pravatar.cc/100?img=15",
        },

        seller: {
            id: 106,
            name: "Akshay Deshmukh",
            avatar: "https://i.pravatar.cc/100?img=15",
        },
    },

    {
        id: 7,
        title: "Mechanical Keyboard",
        category: "Electronics",
        condition: "Like New",
        location: "Hyderabad",
        desiredProduct: "Headphones",
        description:
            "RGB mechanical keyboard with blue switches. Used for a short period and works perfectly.",

        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",

        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1000",
        ],

        owner: {
            id: 107,
            name: "Rohan Singh",
            avatar: "https://i.pravatar.cc/100?img=68",
        },

        seller: {
            id: 107,
            name: "Rohan Singh",
            avatar: "https://i.pravatar.cc/100?img=68",
        },
    },

    {
        id: 8,
        title: "Acoustic Guitar",
        category: "Music",
        condition: "Good",
        location: "Mumbai",
        desiredProduct: "Digital Piano",
        description:
            "Well maintained acoustic guitar perfect for beginners. Smooth sound and comfortable to play.",

        image:
            "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800",

        images: [
            "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=1000",
            "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1000",
            "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=1000",
        ],

        owner: {
            id: 108,
            name: "Siddharth Rao",
            avatar: "https://i.pravatar.cc/100?img=53",
        },

        seller: {
            id: 108,
            name: "Siddharth Rao",
            avatar: "https://i.pravatar.cc/100?img=53",
        },
    },
];

export default products;