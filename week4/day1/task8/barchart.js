const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const padding = { top: 50, right: 40, left: 60, bottom: 50 };
const chartWidh = canvas.width - padding.left - padding.right;
const chartHeight = canvas.height - padding.top - padding.bottom;
let startTime = null;
let hoveredBarIndex = null;
let timeProgress = 0;
let barGeometries = [];
let salesData = [200, 130, 15, 86, 180, 132, 70, 190, 140, 45, 120, 170];
let month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const animationDuration = 3000;
const maxDataValue = 200;
function drawChart(v) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barGeometries = [];
    const gridRows = 5;
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    ctx.fillStyle = 'red';
    ctx.textAlign = "right"
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= gridRows; i++) {
        const ratio = i / gridRows;
        const y = padding.top + chartHeight * (1 - ratio);
        const value = maxDataValue * ratio;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(canvas.width - padding.right, y);
        ctx.stroke();
        ctx.fillText(value, padding.left - 10, y);
        // console.log("hello");
    }
    if (salesData.length === 0)
        return;
    const totalBars = salesData.length;
    const maxBarwidth = chartWidh / totalBars;
    const barWidth = 0.85 * maxBarwidth;
    let i = 0;
    for (let val of salesData) {
        let targetBarHeight = (val / maxDataValue) * chartHeight;
        const currentBarHeight = targetBarHeight * v;
        // console.log(currentBarHeight)
        const barY = padding.top + chartHeight - currentBarHeight;
        const barX = padding.left + (i * maxBarwidth) + (maxBarwidth - barWidth) / 2;
        // console.log(barY)
        barGeometries.push({
            index: i,
            x: barX,
            y: barY,
            width: barWidth,
            height: currentBarHeight,
            value: val
        });
        ctx.save();
        const gradient = ctx.createLinearGradient(barX, barY, barX, padding.top + currentBarHeight);
        if (i === hoveredBarIndex) {
            gradient.addColorStop(1, 'blue');
            gradient.addColorStop(0, 'pink');
        }
        else {
            gradient.addColorStop(1, 'yellow');
            gradient.addColorStop(0, 'green');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(barX, barY, barWidth, currentBarHeight);
        ctx.restore();
        ctx.save()
        ctx.textAlign = 'center';
        ctx.fillText(month[i], barX + barWidth / 2, canvas.height - 20);
        ctx.fillStyle = 'red';
        ctx.restore();
        i = i + 1;
    }
}
function animate(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    let elapsed = timestamp - startTime;
    timeProgress = Math.min(1, elapsed / animationDuration);
    drawChart(timeProgress);
    if (timeProgress < 1) {
        requestAnimationFrame(animate);
    }
}
requestAnimationFrame(animate);
function drawToolTipe(x, y, value) {
    const text = `value:${value}`;
    const textWidth = ctx.measureText(text).width;
    const toolTipW = textWidth + 5;
    const toolTipH = 20;
    const toolTipX = x - toolTipW / 2;
    const toolTipY = y - toolTipH - 10;
    ctx.save()
    ctx.fillStyle = 'white';
    ctx.fillRect(toolTipX, toolTipY, toolTipW, toolTipH);
    ctx.restore()
    ctx.strokeStyle = 'white';
    ctx.fillText(text, toolTipX + toolTipW / 2, toolTipY + toolTipH / 2);
}
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    let currentHoverdIndex = null;
    for (let bar of barGeometries) {
        if (mouseX >= bar.x && mouseX <= bar.x + bar.width && mouseY >= bar.y && mouseY <= bar.y + bar.height) {
            currentHoverdIndex = bar.index;
            break;
        }
    }
    if (currentHoverdIndex !== hoveredBarIndex) {
        hoveredBarIndex = currentHoverdIndex;
        canvas.style.cursor = hoveredBarIndex !== null ? 'pointer' : 'default';
    }
    if (hoveredBarIndex !== null) {
        drawChart(timeProgress);
        const activeBar = barGeometries[hoveredBarIndex];
        drawToolTipe(mouseX, mouseY, activeBar.value);
    }
    else {
        drawChart(timeProgress);
    }
})
canvas.addEventListener('mouseleave', () => {
    if (hoveredBarIndex !== null) {
        hoveredBarIndex = null;
        canvas.style.cursor = 'default';
        drawChart(timeProgress);
    }
});
const anchor = document.getElementById('download')
anchor.href = canvas.toDataURL();
anchor.appendChild(link)


