export const USER_API = "https://twitter-clone-backend-7p41.onrender.com/api/v1/user" ;
export const TWEET_API = "https://twitter-clone-backend-7p41.onrender.com/api/v1/tweet";

export const timeSince = (timestamp) => {
      if (!timestamp) return "just now";
      
    let time = Date.parse(timestamp);
    if (isNaN(time)) return "just now";
    let now = Date.now();
    let secondsPast = (now - time) / 1000;

    if (secondsPast >= 86400) {
        return new Date(time).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    if (secondsPast < 1) return "just now";
    let intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        d: 86400,
        hr: 3600,
        m: 60,
        s: 1
    };
  
    for (let i in intervals) {
          let interval = intervals[i];
          if (secondsPast >= interval) {
              let count = Math.floor(secondsPast / interval);
              return `${count}${i} `;
          }
      }
  }