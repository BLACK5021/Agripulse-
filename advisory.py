# Simple Python advisory helper (optional)
def crop_advice(crop, location):
    rules = {
        "maize": "Irrigate weekly, apply NPK fertilizer and monitor for fall armyworm.",
        "beans": "Avoid waterlogging; use organic manure; consider rhizobium inoculant.",
        "potatoes": "Plant in ridges, apply compost, monitor for blight.",
    }
    return rules.get(crop.lower(), "General tip: Rotate crops and add organic matter.")

if __name__ == '__main__':
    import sys
    if len(sys.argv) >= 3:
        crop = sys.argv[1]
        location = sys.argv[2]
    else:
        crop = 'maize'; location = 'Nairobi'
    print(crop_advice(crop, location))
