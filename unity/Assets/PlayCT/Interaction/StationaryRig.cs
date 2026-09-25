using Unity.XR.CoreUtils;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Locomotion;

namespace PlayCT.Interaction
{
    /// <summary>
    /// Rig estacionario: el participante mira y alcanza la mesa. No hay locomoción.
    /// </summary>
    public sealed class StationaryRig : MonoBehaviour
    {
        [SerializeField] XROrigin origin;

        Vector3 _posicion;
        Quaternion _rotacion;

        void Awake()
        {
            foreach (var locomocion in GetComponentsInChildren<LocomotionProvider>(true))
                locomocion.enabled = false;

            if (origin != null)
            {
                origin.RequestedTrackingOriginMode = XROrigin.TrackingOriginMode.Floor;
                origin.CameraYOffset = 0f;
            }

            _posicion = transform.position;
            _rotacion = transform.rotation;
        }

        void LateUpdate()
        {
            transform.SetPositionAndRotation(_posicion, _rotacion);
        }
    }
}
