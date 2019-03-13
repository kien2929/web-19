window.onload = () => {
  document.getElementById("search").addEventListener("submit", (e) => {
    e.preventDefault();
    // window.setTimeout(()=>{},1000);
    const form = document.getElementById("search");
    $.ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${
        form.keyword.value
      }&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
      type: "GET",
      data: {},
      success: (data) => {
        console.log(data);
        nextPageToken=data.nextPageToken;
        $('#result-list').html('');
        data.items.forEach((items)=>{
            const itemLink = 
                `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${items.id.videoId}?autoplay=true" target="_blank">
                    <img src="${items.snippet.thumbnails.high.url}" alt="">
                    <div class="video_info">
                    <h2 class="title">${items.snippet.title}</h2>
                    <p class="description">${items.snippet.description}</p>
                    <span>View >></span>
                </div>
            </a>`
        $('#result-list').append(itemLink);
        })
      },
      error: (error) => {if(error)throw error}
      
    });
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${
                    form.keyword.value
                  }&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
                type: "GET",
                data: {},
                success: (data) => {
                  console.log(data);
                  nextPageToken=data.nextPageToken;
                  data.items.forEach((items)=>{
                      const itemLink = 
                          `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${items.id.videoId}?autoplay=true" target="_blank">
                              <img src="${items.snippet.thumbnails.high.url}" alt="">
                              <div class="video_info">
                              <h2 class="title">${items.snippet.title}</h2>
                              <p class="description">${items.snippet.description}</p>
                              <span>View >></span>
                          </div>
                      </a>`
                  $('#result-list').append(itemLink);
                  })
                },
                error: (error) => {if(error)throw error}
                
              });
        }
     });
  });
};
