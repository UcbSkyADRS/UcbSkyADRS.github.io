export default function Blog() {
  const posts = [
    {
      title: "Automating Algorithm Discovery: A Case Study in Spot Instance Scheduling",
      author: "ADRS Team",
      date: "October 30, 2025",
      excerpt:
        "This post is the second in our AI-Driven Research Systems (ADRS) series, where we apply AI to optimize complex system problems. Here, we tackle spot instance scheduling, a classic cost-versus-reliability problem in the cloud. Specifically, we demonstrate how OpenEvolve discovers novel algorithms that surpass the algorithm from an NSDI'24 Best Paper, achieving up to 16% and 48% cost savings in a single and multi-region setups, respectively.",
      image: "/spot.png",
      url: "https://adrs-ucb.notion.site/spot-instance-scheduling",
    },
    {
      title: "Automating Algorithm Discovery: A Case Study in MoE Load Balancing",
      author: "ADRS Team",
      date: "October 23, 2025",
      excerpt:
        "This post is the first in a series of case studies in which we apply AI-Driven Research for Systems (ADRS) to optimize performance in various systems. In this blog, we discuss the optimization of a key component in large language model (LLM) inference. Specifically, we demonstrate how OpenEvolve independently discovers and surpasses highly optimized algorithms engineered by human experts to achieve a 5.0x speedup.",
      image: "/moe.png",
      url: "https://adrs-ucb.notion.site/moe-load-balancing",
    },
    {
      title: "Barbarians at The Gate: How AI is Upending Systems Research",
      author: "ADRS Team",
      date: "October 17, 2025",
      excerpt:
        "AI is no longer just tuning systems as a \"black box.\" It's now rewriting their core algorithms by treating the system as a \"white box\" and discovering solutions that can outperform human experts. This new approach, which we term AI-Driven Research for Systems (ADRS), can automate some of the most tedious parts of reseach.",
      image: "/image1.png",
      url: "https://adrs-ucb.notion.site/",
    }
  ];

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-berkeleyBlue">Blog Series</h1>
        <p className="text-xl md:text-2xl text-primary/80">
          Insights and case studies from AI-Driven Research Systems (ADRS).
        </p>
      </header>

      <div className="space-y-8">
        {posts.map((post, idx) => (
          <a
            key={idx}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow no-underline"
            aria-label={`Read ${post.title} on Notion`}
          >
            <div className="bg-white md:flex md:items-stretch">
              <div className="md:basis-5/12 bg-white flex items-center justify-center p-4 md:p-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 md:h-64 object-contain"
                />
              </div>
              <div className="md:basis-7/12 bg-berkeleyBlue text-white p-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-white/80 text-sm md:text-base border-b border-white/20 pb-3">
                  by: {post.author}, {post.date}
                </p>
                <p className="mt-4 text-white/90 text-base md:text-lg">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}


