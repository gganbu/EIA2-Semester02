namespace GArt {

    window.addEventListener("load", handleLoad);
    let ctx: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        ctx = canvas.getContext("2d")!;      
        ctx.save();
        gradient();

        for (let index: number = 0; index < Math.random() * 20; index++) {
            curve();
            ctx.translate(0, +20);
        }
        ctx.restore();
        ctx.save();
        
        for (let index: number = 0; index < 8; index++) {
            circle();
            
        }

        for (let index: number = 0; index < 10; index++) {
            smallCircle();
            
        }

        for (let index: number = 0; index < 5; index++) {
             triangle();
                    
       }

        ctx.save();
        
    } 
    
    function circle(): void {
        let x: number = Math.random() * 1000;
        let y: number = Math.random() * 1000;
        ctx.beginPath();
        ctx.arc(x, y, 50, 7, 0.5 * Math.PI);
        ctx.stroke();      
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
    }

    function smallCircle(): void {
        let randomRadius: number = Math.random() * 30;
        let x: number = Math.random() * 800;
        let y: number = Math.random() * 800;
        ctx.beginPath();
        ctx.arc(x, y, randomRadius, 0, 2 * Math.PI);
        ctx.stroke();   
    }

    function curve(): void {
        ctx.beginPath();
        ctx.moveTo(-1, 800); 
        ctx.bezierCurveTo(30, 200, 880, 200, 851, 500); 
        ctx.stroke(); 
        ctx.lineWidth = 2;
    }

    function triangle(): void {
    let x: number = Math.random() * 800;
    let y: number = Math.random() * 800;
    let z: number = Math.random() * 800;
    let q: number = Math.random() * 800;
    let h: number = Math.random() * 800;
    let g: number = Math.random() * 800;
    ctx.beginPath();
    // Point A
    ctx.moveTo(x, y);
    // Point B
    ctx.lineTo(z, q);
    // Point C
    ctx.lineTo(h, g);
    // Join C & A
    ctx.closePath();
  
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
    }

    function gradient(): void {
        let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 899, 499);

        let h1: number = Math.floor(Math.random() * (300 - 150 + 1)) + 200; 
        let s1: number = Math.floor(Math.random() * 100);
        let l1: number = Math.floor(Math.random() * 80); 
        let a1: number = 1;
        let h2: number = Math.floor(Math.random() * (300 - 150 + 1)) + 200; 
        let s2: number = Math.floor(Math.random() * 100); 
        let l2: number = Math.floor(Math.random() * 80); 
        let a2: number = 1;
        let h3: number = Math.floor(Math.random() * (300 - 150 + 1)) + 200; 
        let s3: number = Math.floor(Math.random() * 100); 
        let l3: number = Math.floor(Math.random() * 80); 
        let a3: number = 1;

        gradient.addColorStop(0, "hsla(" + h1 + "," + s1 + "%," + l1 + "%," + a1 + ")");
        gradient.addColorStop(.5, "hsla(" + h2 + "," + s2 + "%," + l2 + "%," + a2 + ")");
        gradient.addColorStop(1, "hsla(" + h3 + "," + s3 + "%," + l3 + "%," + a3 + ")");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 800);
    }

}