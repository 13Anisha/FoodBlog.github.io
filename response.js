function getBotResponse(input) {
    
    if (input.toLowerCase()=="what is the time right now?")
    {
        return getTime();
    }
    
    else if (input.toLowerCase() == "hello" ) {
        return "Hello there!";
    } 
    else if (input.toLowerCase() == "goodbye") {
        return "Talk to you later!";
    } 
    else if(input.toLowerCase() == "can you tell me something about this website?")
    {
        return "This website is a culinary haven curated by Annie, a passionate chef blending diverse flavors and cultural influences into unforgettable recipes. Join Annie on a flavorful journey of culinary discovery, where each dish tells a story and every meal is an adventure in creativity and taste.";

    }
    else if(input.toLowerCase()=="can you suggest some good and healthy recipes?")
    {
        return ["Palak Paneer Salad", "Idli Chaat", "Tofu Stir-Fry", "Samosa Stuffed Potatoes"];

    }
    else if(input.toLowerCase()=="can you tell me something about the owner of this website?")
    {
        return "This website is made by Annie, who loves cooking and is really good at it. She gets ideas from different cultures and places she's been to, making her dishes not only tasty but also interesting. Whether you're a chef or just learning, Annie wants everyone to enjoy her food and discover new flavors together."
    }
    else if(input.toLowerCase()=="is this site good?")
    {
        return "Yes, this site is great! Annie's recipes are delicious and diverse, perfect for anyone looking to explore new flavors and dishes."
    }

    else if(input.toLowerCase()=="how can i contact the owner?")
    {
        return "To contact the owner, look for a 'Contact' section on the website or check their social media profiles for contact information."
    }
    else if(input.toLowerCase()=="tell me something about yourself")
    {
        return "I'm FoodHub's chatbot, your foodie friend ready to help with recipes and more! Let's explore tasty delights together!"
    }
    else {
        return "Try asking something else!";
    }
}