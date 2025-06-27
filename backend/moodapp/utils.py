import openai
import requests
# NOTE: Use environment variables in production. This is just for testing/demo.
openai.api_key = ""  # Replace with your actual OpenAI key
YOUTUBE_API_KEY = ""


def ai_generate_suggestion(note):
    note_lower = note.lower()

    # 🎓 Learning Assistant
    if any(keyword in note_lower for keyword in ["learn", "how to", "study", "course", "tutorial", "skill", "improve", "develop"]):
        role = (
            "You are an assistant that helps users learn new skills by suggesting structured 10 YouTube video tutorial links,5 best   youtube playlists links, and 5 best documentation from search through the google ."
        )
        prompt = f"The user wants to learn: '{note}'. Suggest 7-10 resources (video, playlist, docs) to help them learn this topic quickly and effectively."

    # 🩺 Health Assistant
    elif any(keyword in note_lower for keyword in [
        "disability", "pain", "injury", "fatigue", "depression", "stress", 
        "anxiety", "headache", "ill", "sick", "fever", "diabetes", "weakness"
    ]):
        role = (
            "You are a certified doctor. If the user mentions any health issue or disability, "
            "suggest healthy food, a short physical activity (if possible), and a safe home remedy. "
            "Keep it practical, gentle, and medically safe."
        )
        prompt = f"The user says: '{note}'. What would you suggest as a health recommendation?"

    # 😊 Mood Assistant (default)
      # 😊 Mood Assistant
    elif any(word in note_lower for word in ["sad", "angry", "confused", "upset", "down", "cry", "unhappy"]):
        role = (
            "You are a mood assistant. When a user is feeling sad, angry, confused, or emotionally down, "
            "suggest  12 youtube song video links  and 8 best playlist song links based on user query one calming activity, a motivational book, and helpful mental health advice to feel better in 10 minutes."
        )
        prompt = f"The user says: '{note}'. Suggest best songs and playlist ."
    else:
        role = (
            "You are a general assistant. When a user mentions a mood note, "
            "suggest one calming activity, a motivational book, and helpful mental health advice to feel better in 10 minutes."
        )
        prompt = f"The user says: '{note}'. Suggest ways to improve their mood quickly."
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",  # or gpt-3.5-turbo if quota ends
            messages=[
                {"role": "system", "content": role},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=300,
        )
        return response.choices[0].message["content"].strip()

    except Exception as e:
        return f"❌ AI error: {e}"


# 🎯 Clean YouTube search
def fetch_youtube_results(query, max_results=10, sort_by_views=False):
    try:
        url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "maxResults": max_results + 5,
            "key": YOUTUBE_API_KEY,
            "videoDuration": "medium",  # Avoid shorts
            "order": "viewCount" if sort_by_views else "relevance",
        }
        response = requests.get(url, params=params)
        items = response.json().get("items", [])
        results = []

        for video in items:
            title = video["snippet"]["title"]
            title_lower = title.lower()
            if any(x in title_lower for x in ["shorts", "troll", "meme", "which", "reaction"]):
                continue
            video_id = video["id"]["videoId"]
            url = f"https://www.youtube.com/watch?v={video_id}"
            results.append(f"🔗 [{title}]({url})")

            if len(results) >= max_results:
                break

        return results or ["⚠️ No valid videos found."]
    except Exception as e:
        return [f"❌ YouTube error: {e}"]

# 📺 Playlist fetch
def fetch_playlist(query):
    results = fetch_youtube_results(f"{query} playlist", max_results=1)
    return results[0] if results else "⚠️ No playlist found."

# 📚 Documentation or learning hub links
def fetch_docs_link(note):
    docs = {
        "python": "https://docs.python.org/3/",
        "django": "https://docs.djangoproject.com/en/stable/",
        "react": "https://reactjs.org/docs/getting-started.html",
        "graphic design": "https://www.adobe.com/creativecloud/design/discover/graphic-design.html",
        "ai": "https://learn.microsoft.com/en-us/training/paths/introduction-artificial-intelligence/",
        "machine learning": "https://scikit-learn.org/stable/",
    }
    for key in docs:
        if key in note.lower():
            return f"📚 **Documentation**: {docs[key]}"
    return "📚 Explore more docs on: https://devdocs.io"

# 🔁 Wrapper
def full_learning_support(note):
    ai_summary = ai_generate_suggestion(note)
    video_links = fetch_youtube_results(f"{note} tutorial", max_results=10, sort_by_views=True)
    playlist = fetch_playlist(f"{note} tutorial")
    doc_link = fetch_docs_link(note)

    return (
        f"🤖 **AI Summary**:\n{ai_summary}\n\n"
        f"📺 **Top 10 YouTube Tutorials**:\n" + "\n".join(video_links) + "\n\n"
        f"🎧 **Playlist**:\n{playlist}\n\n"
        f"{doc_link}"
    )

# 🧪 CLI Testing
if __name__ == "__main__":
    user_input = input("🗣️ What do you want to learn or improve? ")
    print("\n💡 Smart Tutor Response:\n")
    print(full_learning_support(user_input))



