$(function() {
    // This section, tests allFeeds. allFeeds is an array that contains a list of numbers
    describe('RSS Feeds', function() {
        // Test that the allFeeds array exists and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Checks each feed has a property
        // called url and that it is not empty
        it('each have URL that is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        // Checks each feed has a property
        // called name and that it is not empty
        it('each have a name that is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        let myBody,
            myMenuIcon;

        beforeEach(function () {
            myBody = $("body");
        });
        // Tests that the menu is hidden by checking for the presence
        // of menu-hidden on the body class
        it('should be hidden by default', function() {
            expect(myBody.hasClass("menu-hidden")).toBe(true);
        });

          // In this section we imitate user behaviour by clicking the menu icon
          // The menu is hidden by default so on first click we expect the menu-hidden
          // class to be removed. On second click it should be added to the body again
          it('can be displayed and hidden on click', function() {
              myMenuIcon = $('.menu-icon-link');

              // Test .menu-hidden has been removed
              myMenuIcon.trigger("click");
              expect(myBody.hasClass("menu-hidden")).toBe(false);
              // Test .menu-hidden hass been added back
              myMenuIcon.trigger("click");
              expect(myBody.hasClass("menu-hidden")).toBe(true);
          });
    });

    describe('Initial Entries', function() {
        // Check that when the ajax call within the loadFeed function runs
        // the loaded text is displayed on the page
        beforeEach(function(done) {
            loadFeed(3, function(){
                done();
            });
        });
        it('should display after the load feed function is executed', function(){
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    // Test that new content is displayed when the loadFeed contact is called
    describe('New Feed Selection', function() {

        let firstFeedText,
            secondFeedText;
        // Prior to testing we will get text from the first and second feed load
        beforeEach(function(done) {
            loadFeed(1, function() {
                // Get text from the first feed
                firstFeedText = $('.feed h2').text();
                loadFeed(2, function() {
                    // Get text from the second feed
                    secondFeedText = $('.feed h2').text();
                    done();
                });
            });
        });

        // Text from the first and second feed are compared
        it('should update when new content is loaded', function(done) {
            expect(firstFeedText).not.toBe(secondFeedText);
            done();
        });
    });
}());
