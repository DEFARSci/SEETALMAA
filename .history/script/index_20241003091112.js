let arraydata=[];
const auteur=document.getElementById('auteur');
const title=document.getElementById('title');
const img=document.getElementById('img');
async function fetchPageData() {
    try {
      const response = await fetch('https://setalmaa.com/wp-json/wp/v2/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
    console.log(data[0]);
    const article=data[0].content.rendered;
    // const img=article.getElementByTagName('img');
    // console.log(article);
    // console.log(img);
    // title.innerHTML=data[0].title.rendered;
  //  title.innerHTML=data[0].content.rendered;

    img.innerHTML=`<img fetchpriority="high" decoding="async" class="size-full wp-image-12913 aligncenter" style="outline: 0px; letter-spacing: -0.15px;" src="http://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa.jpeg" alt="" width="522" height="587" srcset="https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa.jpeg 522w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-173x195.jpeg 173w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-356x400.jpeg 356w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-187x210.jpeg 187w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-370x416.jpeg 370w" sizes="(max-width: 600px) 100vw, 522px" /></p>\n<p><span style="font-weight: 400;">`;

     ;
   
    // auteur.innerHTML=`<img fetchpriority="high" decoding="async" class="size-full wp-image-12913 aligncenter" style="outline: 0px; letter-spacing: -0.15px;" src="http://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa.jpeg" alt="" width="522" height="587" srcset="https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa.jpeg 522w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-173x195.jpeg 173w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-356x400.jpeg 356w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-187x210.jpeg 187w, https://setalmaa.com/wp-content/uploads/FIAB-Forum-International-Afrique-Setalmaa-370x416.jpeg 370w" sizes="(max-width: 600px) 100vw, 522px" /></p>\n<p><span style="font-weight: 400;">`;

      return data;
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
    }
  }

  arraydata=fetchPageData();
  console.log("mon array est ",arraydata);