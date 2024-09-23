<h1>Shuffle Card Deck Performance</h1>
<p>This project evaluates the performance of various pseudorandom number generators (PRNGs) used for shuffling a deck of cards. It provides a web-based interface to test and compare different PRNG algorithms.</p>

<h2>Features</h2>
    <ul>
        <li><strong>Shuffle Algorithms</strong>: Riffle and Overhand shuffling</li>
        <li><strong>PRNGs Tested</strong>:
            <ul>
                <li>JavaScript's built-in <code>Math.random()</code></li>
                <li>Xorshift</li>
                <li>Mersenne Twister</li>
                <li>PCG (Permuted Congruential Generator)</li>
                <li>WELL512a</li>
            </ul>
        </li>
        <li><strong>Performance Measurement</strong>: Time taken to generate a specified number of random numbers</li>
        <li><strong>Visualization</strong>: Chart showing the execution time of each algorithm</li>
        <li><strong>Shuffle Visualization</strong>: Option to visualize the shuffled deck</li>
    </ul>

<h2>Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>A modern web browser</li>
        <li>(Optional) Web server to serve files if testing locally</li>
    </ul>

<h3>Setup</h3>
    <ol>
        <li><strong>Clone the Repository</strong>
            <pre><code>git clone &lt;https://github.com/Brahamanbtp/shuffle-card-deck&gt;
cd &lt;Brahamanbtp
/
shuffle-card-deck&gt;</code></pre>
        </li>
        <li><strong>Open the HTML File</strong>
            <p>Open <code>index.html</code> in your web browser. If you’re using a local web server, ensure it serves the project directory.</p>
        </li>
    </ol>

<h2>Usage</h2>
    <ol>
        <li><strong>Input Parameters</strong>:
            <ul>
                <li><strong>Number of Rounds</strong>: Number of iterations to test each PRNG</li>
                <li><strong>Seed</strong>: Optional seed for PRNG algorithms</li>
                <li><strong>Deck Size</strong>: Size of the card deck</li>
                <li><strong>Shuffle Type</strong>: Choose between Riffle and Overhand shuffling</li>
            </ul>
        </li>
        <li><strong>Select Algorithm</strong>:
            <p>Click on the buttons for each PRNG algorithm to run the performance test.</p>
        </li>
        <li><strong>View Results</strong>:
            <ul>
                <li>The results will be displayed in a table with the start time, end time, and total time taken for each PRNG.</li>
                <li>The performance chart will update to reflect execution times for each PRNG.</li>
                <li>If the “Show Shuffle Visualization” checkbox is checked, the shuffled deck will be displayed.</li>
            </ul>
        </li>
        <li><strong>Toggle Dark Mode</strong>:
            <p>Use the dark mode checkbox to switch between light and dark themes.</p>
        </li>
    </ol>

<h2>Example</h2>
    <p>Select "JS Random" and input <code>1000</code> rounds. Click "JS Random" to run the performance test. Observe the results in the table and chart.</p>

<h2>Contributing</h2>
    <p>Contributions are welcome! Please fork the repository and submit a pull request with your changes.</p>

<h2>License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2>Acknowledgments</h2>
    <ul>
        <li>Chart.js for charting library</li>
        <li>Various sources for pseudorandom number generation algorithms</li>
    </ul>
</body>
</html>
