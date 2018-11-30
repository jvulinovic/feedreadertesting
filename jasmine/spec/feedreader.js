/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */

    describe('RSS Feeds', function() {

        /* The firt test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('should have a URL defined that is not empty', function() {
          for (feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          };
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have a name defined that is not empty', function() {
          for (feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          };
        });
    });


    /* This suite is all about the menu
    * and visibility and behaviour of certain elements.
    */

    describe('The Menu', function() {

        /* The test checks that the menu element
         * is hidden by default.
         */

        it('the menu element should be hidden by default', function() {
            var menuElement = document.getElementsByTagName("BODY")[0].className;
            expect(menuElement).toBe('menu-hidden');
        });

        /* The test checks that the menu element
         * visibility changes when the menu element
         * is clicked.
         */

         it('the menu element changes visibility when clicked', function() {
            var menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(document.getElementsByTagName("BODY")[0].className).not.toBe('menu-hidden');
            menu.click();
            expect(document.getElementsByTagName("BODY")[0].className).toBe('menu-hidden');
         });
    });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

    describe('Initial Entries', function() {

        beforeEach(function(done){
          loadFeed(0, function(){
            done();
          });
        });

         it('checks that there is at least a single entry in the .feed container', function () {
            var feedContainer = $('.feed').children();
            expect(feedContainer.length).toBeGreaterThan(0)
        });

      });

      describe('New Feed Selection', function(){


        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let initialFeed;

        beforeEach(function(done){
          loadFeed(0, function(){
            initialFeed = ($('.feed').children())[0].innerText;
              loadFeed(1, function(){
                  done();
              });
          });
        })

          it('content changes when feed is loaded', function(){
             let currentFeed = ($('.feed').children())[0].innerText;
             expect(initialFeed===currentFeed).toBe(false)

          });
        });


}());
