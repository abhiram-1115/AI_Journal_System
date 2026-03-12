export const generateInsights = (entries) => {

const totalEntries = entries.length;

const emotionCount = {};
const ambienceCount = {};
const keywords = [];

entries.forEach(entry => {

if (entry.emotion) {
emotionCount[entry.emotion] =
(emotionCount[entry.emotion] || 0) + 1;
}

ambienceCount[entry.ambience] =
(ambienceCount[entry.ambience] || 0) + 1;

if (entry.keywords) {
keywords.push(...entry.keywords);
}

});

const topEmotion = Object.keys(emotionCount)
.sort((a,b)=> emotionCount[b]-emotionCount[a])[0];

const mostUsedAmbience = Object.keys(ambienceCount)
.sort((a,b)=> ambienceCount[b]-ambienceCount[a])[0];

const recentKeywords = [...new Set(keywords)].slice(0,5);

return {
totalEntries,
topEmotion,
mostUsedAmbience,
recentKeywords
};

};