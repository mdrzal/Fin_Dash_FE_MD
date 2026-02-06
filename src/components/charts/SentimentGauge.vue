<template>
  <div class="sentiment-gauge flex justify-center">
    <canvas ref="gaugeCanvas" class="max-w-xs w-full h-auto"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  sentimentScore: number; // -1 to 1
}>();
const gaugeCanvas = ref<HTMLCanvasElement | null>(null);
let gaugeChart: Chart | null = null;

function sentimentToAngle(score: number) {
  return (score / 2) * Math.PI - Math.PI / 2;
}
function drawNeedle(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(radius, 0);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.restore();
}

onMounted(() => {
  if (!gaugeCanvas.value) return;
  const ctx = gaugeCanvas.value.getContext('2d')!;

  gaugeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [50, 50],
          backgroundColor: ['#f87171', '#22c55e'], // red and green
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      }
    },
    plugins: [
      {
        id: 'needle-plugin',
        afterDatasetDraw(chart) {
          const { ctx } = chart;
          const meta = chart.getDatasetMeta(0);
          const arc = meta.data[0] as ArcElement;
          const centerX = arc.x;
          const centerY = arc.y;

          const angle = sentimentToAngle(props.sentimentScore);

          drawNeedle(ctx, centerX, centerY, arc.outerRadius * 0.9, angle);

          ctx.save();
          ctx.font = 'bold 16px sans-serif';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.fillText(
            `Sentiment Score: ${props.sentimentScore.toFixed(2)}`,
            centerX,
            centerY + 40
          );
          ctx.restore();
        },
      },
    ],
  });
});

</script>

<style scoped>
.sentiment-gauge {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
</style>
