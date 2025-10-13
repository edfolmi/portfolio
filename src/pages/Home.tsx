import { useFetch } from "../hooks/useFetch";
import { Button } from "../components/ui/Button";
import { PortfolioSection } from "../components/layout/Portfolio";


const Home = () => {
    const { loading, error } = useFetch<{ id: number; title: string }[]>(
        "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            {/* Hero */}
            <section id="hero">
                <div className="hero">
                    <div
                        className="hero-text fade-in"
                        style={{ animationDelay: ".1s" }}
                    >
                        <div
                            className="pretitle"
                            style={{
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                fontWeight: 600,
                                color: "var(--muted)",
                                fontSize: ".75rem",
                            }}
                        >
                            Backend & API Specialist
                        </div>
                        <h1 className="headline">
                            I build secure, scalable APIs & backends for startups and businesses.
                        </h1>
                        <p className="subheadline">
                            Specializing in fintech, SaaS, healthtech & logistics integrations.
                        </p>
                        <div className="cta-group">
                            <a href="#contact">
                                <Button size="lg" className="btn">
                                    Hire Me
                                </Button>
                            </a>
                            <a
                                href="#portfolio"
                                style={{
                                    padding: ".65rem 1.3rem",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,.15)",
                                    fontWeight: 600,
                                }}
                            >
                                View Work
                            </a>
                        </div>
                        <div style={{ marginTop: "1rem", fontSize: ".85rem" }}>
                            <span className="pill">Python</span>
                            <span className="pill">Django / DRF</span>
                            <span className="pill">PostgreSQL</span>
                            <span className="pill">AWS</span>
                        </div>
                    </div>
                    <div
                        className="hero-visual fade-in"
                        style={{ animationDelay: ".25s" }}
                    >
                        <div className="code-mockup" aria-label="Code snippet illustration">
                            <div className="code-line">
                                {"<?php // (Imagine this is secure Django REST endpoint) ?>"}
                            </div>
                            <div className="code-line">@api_view(['GET'])</div>
                            <div className="code-line">def metrics(request):</div>
                            <div
                                className="code-line"
                                style={{ marginLeft: 16 }}
                            >
                                {`"""Returns system health and throughput"""`}
                            </div>
                            <div
                                className="code-line"
                                style={{ marginLeft: 16 }}
                            >
                                data = calculate_metrics()
                            </div>
                            <div
                                className="code-line"
                                style={{ marginLeft: 16 }}
                            >
                                return Response(data)
                            </div>
                            <div
                                className="code-line"
                                style={{
                                    marginTop: 8,
                                    fontSize: ".55rem",
                                    color: "var(--muted)",
                                }}
                            >
                                {/* Real backend, real results. */}
                                {"/* Real backend, real results. */"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-down" aria-label="Scroll down indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <div>Scroll</div>
                </div>

                {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data?.map((item) => (
                        <Card key={item.id} title={item.title}>
                            <p>Post ID: {item.id}</p>
                        </Card>
                    ))}
                </div> */}
            </section>

            {/* Portfolio Section */}
            <PortfolioSection />
        </>
    );
};

export default Home;
