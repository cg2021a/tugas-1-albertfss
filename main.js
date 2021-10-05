function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Kotak kiri 
    const kotak1 = {
        colorAtas : [0.578, 0.156, 0.600], // warna  kotak atas (ungu)
        colorBawah : [0.156, 0.430, 0.600], // warna kotak bawah (biru)

        // titik-titik penyusun gambar kiri
        A : [-0.633, 0.33],
        B : [-0.294, 0.33],
        C : [-0.667, 0.2],
        D : [-0.273, 0.2],
        E : [-0.46, 0.2],
        F : [-0.76, -0.06],
        G : [-0.22, -0.06],
        H : [-0.7, -0.34],
        I : [-0.267, -0.34]
    }

    // Kotak kanan
    const kotak2 = { 
        colorAtas : [0.578, 0.156, 0.600], // warna  kotak atas (ungu)
        colorBawah : [0.156, 0.430, 0.600], // warna kotak bawah (biru)

        // titik-titik penyusun gambar kanan
        A : [0.1, 0.12],
        B : [0.44, 0.34],
        C : [0.1, -0.08],
        D : [0.207, -0.07],
        E : [0.407, 0.09],
        F : [0.567, 0.22],
        G : [0.187, -0.18],
        H : [0.173, -0.24],
        I : [0.353, -0.34],
        J : [0.88, -0.08],
        K : [0.353, -0.6],
        L : [0.88, -0.34]
    }

    // kumpulan vertex pada gambar kiri dan kanan
    const vertices = [
        // objek kotak kiri
        ...kotak1.A, ...kotak1.colorAtas,
        ...kotak1.C, ...kotak1.colorAtas,
        ...kotak1.E, ...kotak1.colorAtas,
        ...kotak1.A, ...kotak1.colorAtas,
        ...kotak1.B, ...kotak1.colorAtas,
        ...kotak1.E, ...kotak1.colorAtas, 
        ...kotak1.B, ...kotak1.colorAtas,
        ...kotak1.D, ...kotak1.colorAtas,
        ...kotak1.E, ...kotak1.colorAtas, //warna biru atas //9

        ...kotak1.C, ...kotak1.colorBawah,
        ...kotak1.E, ...kotak1.colorBawah,
        ...kotak1.F, ...kotak1.colorBawah, 
        ...kotak1.D, ...kotak1.colorBawah,
        ...kotak1.E, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah,
        ...kotak1.E, ...kotak1.colorBawah,
        ...kotak1.F, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah, 
        ...kotak1.F, ...kotak1.colorBawah,
        ...kotak1.H, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah,
        ...kotak1.G, ...kotak1.colorBawah,
        ...kotak1.H, ...kotak1.colorBawah,
        ...kotak1.I, ...kotak1.colorBawah, //warna biru bawah //15
       
        // objek kotak kanan
        ...kotak2.A, ...kotak2.colorAtas,
        ...kotak2.C, ...kotak2.colorAtas,
        ...kotak2.D, ...kotak2.colorAtas,
        ...kotak2.C, ...kotak2.colorAtas,
        ...kotak2.D, ...kotak2.colorAtas,
        ...kotak2.H, ...kotak2.colorAtas, 

        ...kotak2.A, ...kotak2.colorAtas,
        ...kotak2.D, ...kotak2.colorAtas,
        ...kotak2.E, ...kotak2.colorAtas, 
        ...kotak2.A, ...kotak2.colorAtas,
        ...kotak2.B, ...kotak2.colorAtas,
        ...kotak2.E, ...kotak2.colorAtas,
        ...kotak2.B, ...kotak2.colorAtas,
        ...kotak2.E, ...kotak2.colorAtas,
        ...kotak2.F, ...kotak2.colorAtas, //9
        
        ...kotak2.D, ...kotak2.colorBawah,
        ...kotak2.G, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.G, ...kotak2.colorBawah,
        ...kotak2.H, ...kotak2.colorBawah,
        ...kotak2.K, ...kotak2.colorBawah, 
        ...kotak2.G, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.K, ...kotak2.colorBawah, //9

        ...kotak2.D, ...kotak2.colorBawah,
        ...kotak2.E, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah, 
        ...kotak2.E, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.J, ...kotak2.colorBawah,
        ...kotak2.E, ...kotak2.colorBawah,
        ...kotak2.F, ...kotak2.colorBawah,
        ...kotak2.J, ...kotak2.colorBawah, //9

        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.J, ...kotak2.colorBawah,
        ...kotak2.L, ...kotak2.colorBawah,
        ...kotak2.I, ...kotak2.colorBawah,
        ...kotak2.K, ...kotak2.colorBawah,
        ...kotak2.L, ...kotak2.colorBawah, //6   
    ]

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
    }

    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    //Kecepatan  (NRP 0116 - Albert)
    var speed = 0.0116;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices() {
        if (vertices[206] < -1.0 || vertices[176] > 1.0) {
            speed = speed * -1; 
        }

        for (let i = 121; i < vertices.length; i += 5) { 
            vertices[i] = vertices[i] + speed; 
        }
    }

    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.910, 0.827, 0.555, 1.0); //warna krem
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 63; 
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}