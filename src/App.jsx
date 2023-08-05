function extractPlainText(html) {
  let res = html.replace(/<(?:.|\n)*?>/gm, " ");
  res = res.replace(/\s\s+/g, " ");
  return res.trim();
}

export default function App() {
  function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    // your logic goes here
    let output = htmlContent;
    let count = 0;
    plainTextPositions.map((value) => {
      // Extracts the particular substring from the plain text whose position is given in the array.
      let subStr = plainText.substring(value.start, value.end);
      // Made a highlight template to replace the said substring.
      let highlight = `<mark>${subStr}</mark>`;
      // Gets the index of all the words in the html content that matches the substring.
      let indexes = [...htmlContent.matchAll(new RegExp(subStr, "gi"))].map(
        (idx) => idx.index
      );
      // Subtracts the positions in htmlContent from that of plainText to find the distance between words.
      let bestMatchArray = indexes.map((bm) => Math.abs(bm - value.start));
      // Gets the minimum element from the new array to decide which substring word in htmlContent will be the closest to the substring word in plaintext.
      let bestMatch = Math.min.apply(null, bestMatchArray);
      // Gets the index of that minimum element
      let bestMatchIndex = bestMatchArray.indexOf(bestMatch);
      // Calls a function that replaces the substring in htmlContent with the highlight template made above.
      output = replaceRange(
        output,
        indexes[bestMatchIndex] + count,
        indexes[bestMatchIndex] + subStr.length + count,
        highlight
      );
      // Increases the count to compensate for the added tags in htmlContent.
      count = count + highlight.length - subStr.length;
    });
    return output;
  }

  // This function replace the substring within the range(start, end) with the specified substitute
  function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
  }

  const htmlContent =
    '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
  const plaint2 = extractPlainText(htmlContent);
  const positions = [
    {
      start: 241,
      end: 247,
    },
    {
      start: 518,
      end: 525,
    },
  ];

  const output = highlightHTMLContent(htmlContent, plaint2, positions);

  return (
    <div>
      <h1>
        <center>Before</center>
      </h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <h1>
        <center>After</center>
      </h1>
      <div dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
}
