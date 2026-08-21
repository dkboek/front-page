// This file contains functions used for loading and submitting proverbs,
//  when using the form located at proverbs.html


async function submitProverb(_supabase, proverbInputEl, successTextEl) {
    try {
        // To submit a proverb, we read the contents of the input textarea and upload to supabase
        const submissionText = proverbInputEl.value;
        // If empty, we get annoyed
        if (submissionText == "") {
            successTextEl.innerHTML = "Please enter a proverb.";
            successTextEl.style.opacity = 1;
            return;
        }

        const { data, error } = await _supabase
        .from('proverbList')
        .insert({ proverb_text:  submissionText});
        
        console.log("Proverb successfully submitted");
        
        // Reset the textarea, and display the Submitted! text
        proverbInputEl.value = "";
        successTextEl.innerHTML = "Submitted!";
        successTextEl.style.opacity = 1;

    } catch (err) {
        console.error("Error when submitting proverb: " + err);
        alert("Error: there was a problem when submitting your proverb, please try again");
    }
}

async function selectProverbs(_supabase, maxNum = 7) {

    let activeProverbList;
    try {
        const { data, error } = await _supabase
        .from('proverbList')
        .select()
        .eq('approved', true);
        const objectList = data;
        activeProverbList = [];
        
        for ( let i = 0; i < maxNum; i++ ) {
            if ( objectList.length == 0 ) {
                break
            }
            // Generate an index between zero and length-1, to select random proverbs sequentially
            const randomIndex = randomInt(objectList.length);
            const newText = objectList[randomIndex].proverb_text;

            // Add the active proverb, and remove it from the selection list
            activeProverbList.push( newText );
            objectList.splice(randomIndex, 1);
        }
    } catch (err) {
        console.log("Error when loading in proverbs: " + err);
        activeProverbList = ["Solitude is always right around the corner"];
    } finally {
        console.log("Proverb selection complete");
    }

    return activeProverbList;
}