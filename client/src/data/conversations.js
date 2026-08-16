const conversations = [
    {
        id: 1,

        user: {
            id: 101,
            name: "Rahul Sharma",
            avatar: "https://i.pravatar.cc/100?img=12",
            online: true,
        },

        product: {
            id: 1,
            title: "Sony WH-1000XM5",
            image:
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
        },

        offeredProduct: {
            id: 7,
            title: "Mechanical Keyboard",
            image:
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        },

        status: "Pending",

        lastMessage:
            "Hey, I'm interested in the keyboard. Is it still available?",

        lastMessageTime: "10:42 AM",

        unread: 2,

        messages: [
            {
                id: 1,
                sender: "them",
                text:
                    "Hi! I saw your swap request for my Sony WH-1000XM5.",
                time: "10:31 AM",
            },

            {
                id: 2,
                sender: "me",
                text:
                    "Hey Rahul! Yes, I'm interested in the headphones. I can offer my Mechanical Keyboard.",
                time: "10:35 AM",
            },

            {
                id: 3,
                sender: "them",
                text:
                    "Sounds good. Is the keyboard in working condition?",
                time: "10:39 AM",
            },

            {
                id: 4,
                sender: "me",
                text:
                    "Yes, absolutely. It's in like-new condition and all the keys work perfectly.",
                time: "10:41 AM",
            },

            {
                id: 5,
                sender: "them",
                text:
                    "Hey, I'm interested in the keyboard. Is it still available?",
                time: "10:42 AM",
            },
        ],
    },

    {
        id: 2,

        user: {
            id: 102,
            name: "Priya Patil",
            avatar: "https://i.pravatar.cc/100?img=32",
            online: false,
        },

        product: {
            id: 2,
            title: "MacBook Air M1",
            image:
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        },

        offeredProduct: {
            id: 6,
            title: "JavaScript Programming Book",
            image:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        },

        status: "Pending",

        lastMessage:
            "Would you be interested in a book + cash difference?",

        lastMessageTime: "Yesterday",

        unread: 0,

        messages: [
            {
                id: 1,
                sender: "me",
                text:
                    "Hi Priya, would you consider swapping the MacBook for my JavaScript books?",
                time: "Yesterday",
            },

            {
                id: 2,
                sender: "them",
                text:
                    "Would you be interested in a book + cash difference?",
                time: "Yesterday",
            },
        ],
    },

    {
        id: 3,

        user: {
            id: 103,
            name: "Amit Kulkarni",
            avatar: "https://i.pravatar.cc/100?img=11",
            online: true,
        },

        product: {
            id: 3,
            title: "Mountain Bike",
            image:
                "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400",
        },

        offeredProduct: {
            id: 8,
            title: "Acoustic Guitar",
            image:
                "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400",
        },

        status: "Accepted",

        lastMessage:
            "Sure, we can meet this weekend in Pune.",

        lastMessageTime: "Yesterday",

        unread: 0,

        messages: [
            {
                id: 1,
                sender: "me",
                text:
                    "Would you be interested in swapping the guitar for your bike?",
                time: "Yesterday",
            },

            {
                id: 2,
                sender: "them",
                text:
                    "Sure, we can meet this weekend in Pune.",
                time: "Yesterday",
            },
        ],
    },
];

export default conversations;